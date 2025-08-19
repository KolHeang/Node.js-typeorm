import { attendanceRepository } from "../repositories/attendance.repository";
class AttendanceService {
    private attendanceRepository = attendanceRepository;
    private detectSession(time: string): "morning" | "afternoon" {
        const [hours, minutes] = time.split(":").map(Number);
        return hours < 12 ? "morning" : "afternoon";
    }

    private isLate(time: string, session: "morning" | "afternoon"): boolean {
        if (session === "morning") return time > "08:30:00"; // example morning late threshold
        return false; // afternoon not considered late
    }

    async checkIn(employeeCode: string, time: string) {
        const today = new Date().toISOString().split("T")[0];
        let attendance = await this.attendanceRepository.findOne({
        where: { employee_code: employeeCode, attendance_date: new Date(today) },
        });

        if (!attendance) {
        attendance = this.attendanceRepository.create({
            employee_code: employeeCode,
            attendance_date: today,
            time_logs: [],
        });
        }

        const session = this.detectSession(time);
        const late = this.isLate(time, session);

        // Add new check-in
        attendance.time_logs.push({ checkin: time, checkout: null, session, isLate: late });
        await this.attendanceRepository.save(attendance);

        return attendance;
    }

    async checkOut(employeeCode: string, time: string) {
        const today = new Date().toISOString().split("T")[0];
        const attendance = await this.attendanceRepository.findOne({
            where: { employee_code: employeeCode, attendance_date: new Date(today) },
        });

        if (!attendance || attendance.time_logs.length === 0) {
        throw new Error("No check-in found for today");
        }

        const lastLog = attendance.time_logs[attendance.time_logs.length - 1];
        if (lastLog.checkout) {
        throw new Error("Already checked out, please check in again first");
        }

        lastLog.checkout = time;

        // Update total time
        attendance.total_time = this.calculateTotal(attendance.time_logs);

        await this.attendanceRepository.save(attendance);
        return attendance;
    }

    private calculateTotal(timeLogs: { checkin: string; checkout: string }[]): string {
        let totalMs = 0;
        for (const log of timeLogs) {
        if (log.checkin && log.checkout) {
            totalMs += new Date(`1970-01-01T${log.checkout}Z`).getTime() - new Date(`1970-01-01T${log.checkin}Z`).getTime();
        }
        }
        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
    }

    async getStatus(employeeCode: string) {
        const today = new Date().toISOString().split("T")[0];
        const attendance = await this.attendanceRepository.findOne({
            where: { employee_code: employeeCode, attendance_date: new Date(today) },
        });

        let status: "checkin" | "checkout" = "checkin";
        let session: "morning" | "afternoon" = "morning";
        let isLate = false;

        if (attendance && attendance.time_logs.length > 0) {
        const lastLog = attendance.time_logs[attendance.time_logs.length - 1];
        if (!lastLog.checkout) {
            status = "checkout";
            session = lastLog.session;
            isLate = lastLog.isLate;
        } else {
            const currentTime = new Date().toTimeString().split(" ")[0];
            session = this.detectSession(currentTime);
            isLate = this.isLate(currentTime, session);
            status = "checkin";
        }
        }

        return { status, session, isLate };
    }
}
