// @ts-ignore
import { parse, unparse } from 'papaparse'

export function fileReaderP(file: File, options: any = {}): Promise<FileReader> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader)
    }
    reader.onerror = reject

    if (options.accept && !new RegExp(options.accept).test(file.type)) {
      reject(new Error('错误的文件类型'))
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
    }
  })
}

export function csvParser(content: string): { success: any; fail: any } {
  const { data, errors, meta } = parse(content, { header: true, skipEmptyLines: true })
  const tmpList = data.map((item: any) => {
    const fields = meta.fields.map((f: string) => item[f])
    return {
      ...item,
      _originData: fields.join(',')
    }
  })
  const fail: any = []
  const failIndex: Set<number> = new Set()
  errors.forEach((error: any) => {
    failIndex.add(error.row)
    fail.push(tmpList[error.row]._originData)
  })
  const success: any = tmpList.filter((item: any, index: number) => !failIndex.has(index))

  return {
    success,
    fail
  }
}

export const downLoadTemplate = (templatePath: string) => {
  const a = document.createElement('a')
  a.href = templatePath
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
