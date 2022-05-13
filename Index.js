const express = require("express");
const admin = require("firebase-admin");

let books = undefined;

function getBooks(amount){
   return books.slice(0, amount);
}

const service = {
    "type": "service_account",
    "project_id": "architecture-f8e99",
    "private_key_id": "57590bc3c883e03b325539f6765e40a019da9680",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaS+9dgrCZhykn\nH8aZ/bQYj5RmitIJr/uUsJt0pwuGnpjcKYAealrP7wfOZp5RhoXuFQp+YkZGNz4H\nhbiOsEWqVlwcxZjDHRKxazjSNMBvWVxWpJ617r+yuOWI0QxwDkWkSu86VUgzHvvf\n8g0KDdmK6nQ/kAok9tdhowExrwurE21JFKxqaP0lHT73ZrNwX1hN94mCDQ6i9ZQY\nZnOahnQvI0+zoPPdQv+NtyOfOFxRCp5SszNerVJoLGRlYiI5b7T8KuSzMJd63c3K\nmoFTYrJUIuX2G6twHeqNqy78/6tfC51d7CcFx7pXTjiMjL+k99fizDiE2neOGRDw\nsV5PI6GRAgMBAAECggEAC3As+symais35MZD7cR9+612fdzf/IcxlPCRWvt115vy\n5FdQlRtN8h4xK57ghlX89beqQyY75BanoDJ3NQoM5WITiq/R8ZzlIYaQ/BxHAQ9/\nJePRlCvHxZL+s77I4kGx7fT+zl87bqFnC09L936BWFKlyCnVvARvK7YZb4/KGKYc\nNJIuzwqgzJFwjbnQ7jKhx9O8Kes5SqEwSl60RZzKNS9uRd7pcLyZMXGw/NtyUi+j\ntULkYxKr1rO2eCP5+mexZU73nR+NtdLDWB2D3yzwtQLc1u2VAC/CzrdgijiDtsvC\nVBSk5B8Xak0q7G6POa+vwdTUPNz45daRnlixHsSksQKBgQDPWfffqBtq2HQI3yd7\nLCOjOllGIye+bblb7k5STZ21fswj3z5AHoKGLLs7CYTT4Mhik9f081cN4k2+xJZR\n9zFVEFVzCCVxG7aqYqPzwHb7Pk45OUl74kqKyEKYWCjZ+zq7TRN1+MVcFBNY1h0e\n7w3LRkEXWEnH9P/kxz4CmrgUjQKBgQC+f12KG66xacCivSgNkSKk6SxXaYlw2aWp\nh79cfjn9RZYG/7l9Ff3md/bYRhOwMDimGky+1XmhGjTceL5aXU9esQ/d9wkah/KK\nudH8Gtxnv/JCzPU/dj/ViEZlED36BHOuIvTrQPcmxhat9NoM7dN9qc8ME/bMyElh\nTGeiw2o6FQKBgHWZMATwAcTCSGTzsx+fdALSR+mIbLUK4/KooFD7ZjOWW08JAPQ6\nmYphejrMdkH4nY2TDgsFq9za+X71Xc/U42y8G8pm111j+2B9G0FWaeSqfJDl1bBm\nMiKt218tuNWQL8okt6HT2pMTa7mZjeCKcgdUq/wCfa3jXPIysg+mEjrNAoGAF6Ps\nssfurPunuUpqHwzk1LxPEWX6dXO9GEXNXKgZgDHThXjUxw4knSZEDuDbbqD9Vreq\n0H/jgTekWbvuO36a6/BjPLN8gLtgQREAWx3mPkXWxa1zvfVpxJEN01rppg5JYNHb\nvRop0bkBdYMOUE5vUYfyNth/ZzhvytBViCBiHWUCgYEArdSK8Tof4V9sslZlIfBg\n4UWgZg1nR0P18bh7ZylZTYjTBYHcYb0pGFr2nPWgqrbhJTsH0gXN6z04Wfup+9vu\nmRDW9fZIfDlZdKd636Kv6aqVzab+DUVLvXHEbqhCRtsOVjj35/A6csVxbBw01uXY\nUzf91otNAB2NwKgWhvgIyME=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-hg5oi@architecture-f8e99.iam.gserviceaccount.com",
    "client_id": "103302148915661014278",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hg5oi%40architecture-f8e99.iam.gserviceaccount.com"
}


admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: "https://architecture-f8e99-default-rtdb.europe-west1.firebasedatabase.app"
});

admin.database().ref("books").on("value", (d) => {
    books = d.val()
})

const app = express()

app.get('/post', (req, res) => {
    const amount = req.query.amount
    console.log("Sending back to client" + amount)

    if (books === undefined)
        res.send("TEST")
    else {
        res.send(getBooks(amount));
    }

});




app.listen("3000", () => {
    console.log("server open");
})