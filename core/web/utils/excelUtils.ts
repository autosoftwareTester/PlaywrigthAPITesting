import path from "path";
import * as XLSX from "xlsx";

export class ExcelUtils {
  // Driver script to read and write test data from excel to test script

  public static readExcel(
    filePath: string,
    sheetName: string,
  ): Record<string, unknown>[] {
    if (!filePath.trim()) {
      throw new Error("Excel file path must not be empty");
    }

    if (!sheetName.trim()) {
      throw new Error("Excel sheet name must not be empty");
    }

    const resolvedPath = path.resolve(filePath);
    const workbook = XLSX.readFile(resolvedPath);
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error(`Sheet "${sheetName}" was not found in ${resolvedPath}`);
    }

    return XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
      defval: "",
    });
  }
}
