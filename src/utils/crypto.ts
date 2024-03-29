/* eslint-disable prettier/prettier */
import crypto from 'crypto-js'

function encryptLogin(username: string, password: string) {
  const base64user = btoa(username)
  const md5pass = crypto.MD5(password)
  const base64pass = btoa(md5pass.toString())

  const userCencrypted = {
    username: base64user,
    password: base64pass,
  }

  return userCencrypted
}

function encryptPass(password: string) {
  const md5pass = crypto.MD5(password)
  const base64pass = btoa(md5pass.toString())

  return base64pass
}

export { encryptLogin, encryptPass }
