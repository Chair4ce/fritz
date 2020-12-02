package mil.af.dgs1sdt.fritz;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class ConversionTest {
  Conversion subject;

  @Before
  public void setUp() {
    this.subject = new Conversion();
  }


  @Test
  public void getDateFromText() throws Exception {
    String text = "CLBY: UNIT/OFFSYM • DRV FM: CoNGA SCG V2.1.0 2018323 • DECLON: 20440425\n" +
      "LEPRECHAUN | 1 STOP VEHICLE FOLLOW ON RED NEON UNCLASSIFIED//FOUO\n" +
      "PROVINCE, COUNTRY CODE | DTG: 251245ZAPR19\n" +
      "DOI: 25APR19\n" +
      "MISSION DATE: 29 APR 19\n" +
      "OP NAME: OP LEPRECHAUN PHASE 8\n" +
      "CALLSIGN: STEPHEN 13 (SN13)\n" +
      "UNCLASSIFIED//FOUO\n" +
      "TOT / 1235Z-1500Z";

    assertEquals(
      "29APR19",
      subject.getDateFromText(text)
    );

    text = "CLBY: UNIT/OFFSYM • DRV FM: CoNGA SCG V2.1.0 2018323 • DECLON: 20440425";
    assertEquals(
      "",
      subject.getDateFromText(text)
    );
  }

  @Test
  public void convertDateStringToUnix() throws Exception {
    assertEquals(
      1556496000L,
      subject.convertDateStringToUnix("29APR19")
    );
  }
}