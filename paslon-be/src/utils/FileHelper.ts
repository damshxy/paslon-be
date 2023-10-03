import * as fs from 'fs'

export const deleteFile = (path: string) => {
    // Cek apakah file ada / exist
    if (fs.existsSync(path)) {
        // Untuk delete file
        fs.unlinkSync(path)
    }
}