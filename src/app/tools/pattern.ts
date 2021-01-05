/*
* @author MjImani
* +989035074205
*/
export class Pattern {
  public static email = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  public static phone = '(([0]+[9])([0-9]{9})||([۰]+[۹])([۰-۹]{9}))$';
  public static faText = '[آ-ی ]+';
  public static enText = '[A-Za-z-_ ]+';
  public static date = '^(([0-9]{1})([.,\/]([0-9]{1,2})){0,1}|([۰-۹]{1})([.,\/]([۰-۹]{1,2})){0,1})';
  public static password = '[-_/@!#$%^&*().A-Za-z0-9]+';
  public static number = '^([0-9]*)$|^([۰-۹]*)$';
  public static EnNumber = '^([0-9]*)$';
  public static FaNumber = '^([۰-۹]*)$';
}
