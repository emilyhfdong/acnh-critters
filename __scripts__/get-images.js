#!/usr/bin/env node
const fs = require("fs")
const request = require("request")
let bugData = require("../src/data/bugs.json")
let fishData = require("../src/data/fish.json")

const downloadImage = (uri) =>
  new Promise((resolve, reject) => {
    request.head(uri, function (err, res) {
      if (err) {
        reject()
      }

      request(uri)
        .pipe(
          fs.createWriteStream(
            `public/assets/${uri
              .replace("https://acnhapi.com/v1/", "")
              .concat(".png")}`
          )
        )
        .on("close", resolve)
    })
  })

const getAllIamges = async () => {
  const critterData = [...Object.values(bugData), ...Object.values(fishData)]
  const imageDownloadPromises = critterData.map((critter) =>
    downloadImage(critter.icon_uri)
  )
  await Promise.all(imageDownloadPromises)
}

getAllIamges()
