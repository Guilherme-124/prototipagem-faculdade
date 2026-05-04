import { useCallback, useMemo, useState } from "react";


function detectLocaleFirstDay(locale: string) {
  try {
    const loc = new Intl.Locale(locale) as any;

    if (loc.weekInfo?.firstDay) {
      const index = loc.weekInfo.firstDay & 7;
      
      return index;
    }
  } catch (error) {
    
  }
  return 0;
}


function useCalendar(date: Date, locale: string) {
  const [startOfMonth, setStartOfMonth] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  )

  const goNext = useCallback(() => {
    setStartOfMonth((date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }, []);

    const goPrev = useCallback(() => {
    setStartOfMonth((date: Date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }, []);

  const data = useMemo(() => {
    const now = new Date();
    const year = startOfMonth.getFullYear();
    const month = startOfMonth.getMonth();

    const endOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = endOfMonth.getDate();

    const weekDayFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'short'
    });
    let weekdays = Array.from({length: 7}, (_, i) => {
      const base = new Date(2021, 7, i + 1);
      return weekDayFormatter.format(base);
    })

    const startIndex = detectLocaleFirstDay(locale);
    weekdays = weekdays.slice(startIndex).concat(weekdays.slice(0, startIndex))

    // Days prev month
    const firstDayIndex = startOfMonth.getDay();
    const leading = (firstDayIndex - startIndex + 7) % 7;

    const cells = [];

    for (let i = leading; i > 0; i--) {
      cells.push({
        date: new Date(year, month, 1 - i),
        currentMonth: false,        
      });
    }


    // Days curr month
    for (let j = 1; j <= daysInMonth; j++) {
      cells.push({
        date: new Date(year, month, j),
        currentMonth: true,
      });
    }
    

    // Days next month
    while (cells.length < 42) {
      const last: Date = cells[cells.length - 1].date;
      const next: Date = new Date(last);
      next.setDate(last.getDate() + 1);
      cells.push({
        date: next,
        currentMonth: false,
      })
    }

    const isToday = (date: Date) => {
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    }

    return {year, month, weekdays, cells, isToday};
  }, [startOfMonth]);

  return {...data, startOfMonth, goNext, goPrev};
}

export default useCalendar;