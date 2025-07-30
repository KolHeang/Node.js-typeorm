export class KhmerDateFormatter {
    static  convertToKhmerNumerals(numStr: string): string {
        return numStr
            .replace(/0/g, "០")
            .replace(/1/g, "១")
            .replace(/2/g, "២")
            .replace(/3/g, "៣")
            .replace(/4/g, "៤")
            .replace(/5/g, "៥")
            .replace(/6/g, "៦")
            .replace(/7/g, "៧")
            .replace(/8/g, "៨")
            .replace(/9/g, "៩");
    }

    static  getKhmerMonth(date: Date): string {
        const khmerMonths = [
            "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", 
            "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ",
        ];
        return khmerMonths[date.getMonth()];
    }

        static  toKhmerWeekNumber(weekNumber: number): string {
        return this.convertToKhmerNumerals(weekNumber.toString());
    }
}