package com.yash.ExpenseClaims.utility;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

public class DateUtility {

    public static LocalDate getFormattedDate(Date date, String format){
        String d1 = new SimpleDateFormat(format).format(date);
        LocalDate formattedDate = LocalDate.parse(d1);
        return formattedDate;
    }
}
