
/**
 * 获取文件扩展名
 * @param path 
 */
export function getFileExtension(path: string) {
    let idx = path.lastIndexOf('.');
    if (idx) {
        return path.substring(idx, path.length);
    }
    return '';
}//getFileExtension