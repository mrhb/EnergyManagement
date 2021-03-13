/**
 * Created by naser on 10/7/17 and update by reza 2021/01/01
 */
export class MyPattern {
  public static email = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  public static phone = '(([0]+[9])([0-9]{9})||([۰]+[۹])([۰-۹]{9}))$';
  public static phoneOrEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$|(([0]+[9])([0-9]{9}))$';
  public static fixedPhone = '^0\\d{2,3}-\\d{8}$';
  public static tell = '(([0])([0-9]{10})||([۰])([۰-۹]{10}))$';
  public static nationalCode = '(([0-9]{10})||([۰-۹]{10}))$';
  public static faText = '[آ-ی ]+';
  public static enText = '[A-Za-z-_ ]+';
  public static date = '^(([0-9]{1})([.,\/]([0-9]{1,2})){0,1}|([۰-۹]{1})([.,\/]([۰-۹]{1,2})){0,1})';
  public static streetName = '[۰-۹-0-9آ-ی ]+';
  public static bankCard = '((([1-9])([0-9]{18})||([۱-۹])([۰-۹]{18}))||(([1-9])([0-9]{15})||([۱-۹])([۰-۹]{15})))$';
  public static shabaNumber = '(([1-9])([0-9]{23})||([۱-۹])([۰-۹]{23}))';
  public static bcNumber = '([1-9]{1}||[1-9]+[0-9]+||[۱-۹]{1}||[۱-۹]+[۰-۹]+)$'; // شماره شناسنامه
  public static password = '[-_/@!#$%^&*().A-Za-z0-9]+';
  public static customPassword = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'; // Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number
  public static smartCode = '[-_/@!#$%^&*().A-Za-z0-9۰-۹]+';
  public static userName = '[_.A-Za-z0-9]+';
  public static ObjectId = '[_.A-Za-z0-9]{24}';
  public static userName2 = '[_A-Za-z0-9]+';
  public static number = '^([0-9]*)$|^([۰-۹]*)$';
  public static EnNumber = '^([0-9]*)$';
  public static FaNumber = '^([۰-۹]*)$';
  public static faNumberAndText = '[۰-۹]*|[آ-ی ]*';
  public static faAndEnNumberAndText = '^[a-zA-Z0-9\u0600-\u06FF ._-]+$';
  public static faAndEnNumberAndTextParagraph = '^[a-zA-Z0-9\u0600-\u06FF \\r\\n._-]+$';
  public static postalCode = '((([1-9]{1})([0-9]{9}))||(([۱-۹]{1})([۰-۹]{9})))$';
  public static nameAndFamily = '([ آ-ی ]+)+([ آ-ی ])';
  public static keyWord = '[آ-ی ]+[()_.A-Za-z0-9-۰-۹-0-9آ-ی]+';

}
