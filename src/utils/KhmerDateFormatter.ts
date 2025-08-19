export class KhmerDateFormatter {
    static khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    static dayNames = ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];
    static lunarMonths = ["មិគសិរ", "បុស្ស", "មាឃ", "ផល្គុន", "ចេត្រ", "ពិសាខ", "ជេស្ឋ", "អាសាឍ", "ស្រាពណ៍", "ភទ្របទ", "អស្សុជ", "កក្ដិក", "បឋមាសាឍ", "ទុតិយាសាឍ"];
    static animalYears = ["ជូត", "ឆ្លូវ", "ខាល", "ថោះ", "រោង", "ម្សាញ់", "មមី", "មមែ", "វក", "រកា", "ច", "កុរ"];
    static eraYears = ["សំរឹទ្ធិស័ក", "ឯកស័ក", "ទោស័ក", "ត្រីស័ក", "ចត្វាស័ក", "បញ្ចស័ក", "ឆស័ក", "សប្តស័ក", "អដ្ឋស័ក", "នព្វស័ក"];

    // Khmer number converter
    static toKhmerNumber(num) {
        return num.toString().split('').map(d => KhmerDateFormatter.khmerDigits[parseInt(d)]).join('');
    }

    // Approximate lunar calculation (very simplified, for demo only)
    static calculateLunarDate(gregorianDate) {
        const date = new Date(gregorianDate);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-based
        const day = date.getDate();
        const dayOfWeek = date.getDay();

        // --- Approximate lunar day ---
        // Lunar day cycles every 29.5 days approx.
        // Let's assume lunar month started Jan 25, 2024 (example)
        const lunarMonthStart = new Date(2024, 0, 25);
        const diffDays = Math.floor((date.getTime() - lunarMonthStart.getTime()) / (1000 * 60 * 60 * 24));
        const lunarDay = ((diffDays % 30) + 1);

        // --- Approximate lunar month (cycle every 29.5 days x 12 months) ---
        const lunarMonth = Math.floor((diffDays / 30) % 12);
        
        // --- Animal year: 12-year cycle starting 1900 = "ជូត" ---
        const animalYearIndex = (year - 1900) % 12;

        // --- Era year: 10-year cycle starting 1979 = "សំរឹទ្ធិស័ក" ---
        const eraYearIndex = (year - 1979) % 10;

        // Buddhist year
        const buddhistYear = year + 543;

        return {
            dayOfWeek,
            lunarDay,
            lunarMonth,
            animalYearIndex,
            eraYearIndex,
            buddhistYear
        };
    }

    // Format Gregorian date
    static formatGregorianDate(dateString) {
        const date = new Date(dateString);
        const day = KhmerDateFormatter.toKhmerNumber(date.getDate());
        const month = KhmerDateFormatter.lunarMonths[date.getMonth()];
        const year = KhmerDateFormatter.toKhmerNumber(date.getFullYear());
        return `ថ្ងៃទី${day} ខែ${month} ឆ្នាំ${year}`;
    }

    // Format Lunar date from Gregorian date string
    static formatLunarDate(dateString) {
        const lunar = KhmerDateFormatter.calculateLunarDate(dateString);
        const dayOfWeekName = KhmerDateFormatter.dayNames[lunar.dayOfWeek];
        
        // For day 15 use "កើត" (full moon), day 30 or 0 use "ម្ភៃ" (new moon)
        let lunarDayStr = lunar.lunarDay === 15 ? "កើត" : (lunar.lunarDay === 30 || lunar.lunarDay === 0 ? "ម្ភៃ" : KhmerDateFormatter.toKhmerNumber(lunar.lunarDay));
        const lunarMonthName = KhmerDateFormatter.lunarMonths[lunar.lunarMonth];
        const animalYear = KhmerDateFormatter.animalYears[lunar.animalYearIndex];
        const eraYear = KhmerDateFormatter.eraYears[lunar.eraYearIndex];
        const buddhistYear = KhmerDateFormatter.toKhmerNumber(lunar.buddhistYear);

        return `ថ្ងៃ${dayOfWeekName} ${lunarDayStr} ខែ${lunarMonthName} ឆ្នាំ${animalYear} ${eraYear} ព.ស.${buddhistYear}`;
    }

    // Example usage:
    static example() {
        const dateStr = "2024-04-13";
        console.log("Gregorian:", KhmerDateFormatter.formatGregorianDate(dateStr));
        console.log("Lunar:", KhmerDateFormatter.formatLunarDate(dateStr));
    }
}