import React, { useState } from 'react'

export default function Page() {

    const host = "http://localhost:5000";

    const [details, setDetails] = useState({
        longUrl: "",
        customString: ""
    })

    const handleChange = (obj) => {
        setDetails({ ...details, [obj.target.name]: obj.target.value });
    }

    const handleSubmit = async (obj) => {
        obj.preventDefault();
        const url = `${host}/api/shorten`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ longUrl: details.longUrl, customString: details.customString })
        });
        const json = await response.json();
        if(!json.success) {
            const msg = document.getElementById("errmsg");
            msg.innerText = "Unavailable custom string";
            setTimeout(() => {
                msg.innerText = "";
            }, 3000);
        }
        else {
            const short = document.getElementById("shorturl");
            short.value = json.shortUrl;
        }
    }

    const handleDisable = () => {
        // Regular expression to validate a URL
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*' + // port and path
        '(\\?[;&a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // query string
        '(\\#[-a-zA-Z0-9_]*)?$','i'); // fragment locator
        return (details.longUrl.length === 0 || !urlPattern.test(details.longUrl));
    }

    return (
        <>
            <div className='container' >
                <form className='container my-5' style={{ backgroundColor: "#134B65", borderRadius: "1rem" }}>
                    <div className="mb-3">
                        <label htmlFor="longUrl" className="form-label my-2" style={{ fontSize: "1.5rem" }}>Enter long Url</label>
                        <input type="url" className="form-control" id="longUrl" name="longUrl" value={details.longUrl} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customString" className="form-label" style={{ fontSize: "1.5rem" }}>Enter custom string</label>
                        <input type="url" className="form-control" id="customString" name="customString" value={details.customString} onChange={handleChange} />
                    </div>
                    <div id="errmsg" style={{color: "red", fontSize: "1rem"}}></div>
                    <button type="submit" disabled={handleDisable()} className="btn my-2" style={{ backgroundColor: "#89b9c5", fontSize: "20px", borderRadius: "1.5rem" }} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <div className='my-5'>
                <h4 style={{ fontSize: "1.5rem", color: "#17153B" }}>The short url is: </h4>
                <input type="url" id="shorturl" style={{ borderRadius: "5px", width: "40rem" }} />
            </div>
        </>
    )
}
