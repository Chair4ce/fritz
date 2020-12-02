export interface RenameRepository {
  rename(data: any, filename: string): Promise<void>;
}