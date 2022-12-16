import React, { Component } from 'react'

export class New extends Component {
  render() {
    return (
      <div>
        <html>
            <body>
                <div className="main-container">
                    <h1 className="title">New Log</h1>
                    <form action="/logs" method="POST" autoComplete="off">
                        Title: <input type="text" name="title" autoComplete="off"/> <br />
                        Entry: <input type="textarea" name="entry" autoComplete="off"/><br />
                        Broken Ship? <input type="checkbox" name="shipIsBroken"/><br />
                        <input type="submit" name="" value="Submit New Log" />
                    </form>
                </div>
            </body>
        </html>
      </div>
    )
  }
}

export default New;