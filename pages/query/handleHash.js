import React from 'react'
const crypto = require('crypto')
const CryptoJS = require('crypto-js')
const { promisify } = require('util')
const pbkdf2 = promisify(crypto.pbkdf2)

function createHashPassword(saltlength, iterations, keylength, digest) {
  return async function hashPassword(password) {
    const salt = crypto.randomBytes(saltlength).toString('base64')
    // const buf = Buffer.from(salt, 'utf-8')
    // const hexSalt = buf.toString('hex')
    const hashBuffer = await pbkdf2(
      password,
      salt,
      iterations,
      keylength,
      digest
    )
    const hash = hashBuffer.toString('hex')
    const secret = 'nextnft'
    const finalHash = CryptoJS.HmacMD5(hash, secret).toString()
    return { finalHash, hash, salt, iterations, keylength, digest }
  }
}

async function isPasswordCorrect(salt, hashPassword, input) {
  //   const buf = Buffer.from(salt, 'utf-8')
  const hashBuffer = await pbkdf2(input, salt, 10000, 64, 'sha512')
  const hashedInput = hashBuffer.toString('hex')
  const secret = 'nextnft'
  const finalHashedInput = CryptoJS.HmacMD5(hashedInput, secret).toString()
  return hashPassword == finalHashedInput
}

module.exports = { createHashPassword, isPasswordCorrect }
