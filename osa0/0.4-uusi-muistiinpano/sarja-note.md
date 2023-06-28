sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
Note right of browser: The browser's form-functionality sends the input of the notes-form to the server with POST request.
activate server.
Note right of server: Server makes an object out of note-input and generated timestamp, then adds the object to the notes-array. 
server-->>browser: Code 302 - a prompt to redirect to "https://studies.cs.helsinki.fi/exampleapp/notes"
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->>browser: HTML document
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server-->>browser: the css file
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server
server-->>browser: the JavaScript file
deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server-->>browser: [{ "content": "Hi from Medellín", "date": "2023-05-08T23:43:15.369Z" }, ... ]
deactivate server    

Note right of browser: The browser executes the callback function that renders the notes  -->