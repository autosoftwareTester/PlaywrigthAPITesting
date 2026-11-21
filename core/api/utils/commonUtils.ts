export class CommonUtils {
  public generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    if (
      length <= 0 ||
      !Number.isInteger(length) ||
      isNaN(length) ||
      !isFinite(length) ||
      length > Number.MAX_SAFE_INTEGER ||
      length < Number.MIN_SAFE_INTEGER ||
      length > charactersLength
    ) {
      throw new Error("Length must be a positive integer.");
    }
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
