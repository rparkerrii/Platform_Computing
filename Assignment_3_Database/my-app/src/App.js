export function CreateApp()
{
    var image = require('./images/earstucked.jpg');

    // Create document object
    console.log("startign")
    const doc = document.implementation.createHTMLDocument("About Me Page");
    
    // Create HTML structure
    const html = doc.documentElement;
    const head = doc.createElement("head");
    const body = doc.createElement("body");
    
    // Meta tags
    const metaCharset = doc.createElement("meta");
    metaCharset.setAttribute("charset", "UTF-8");
    head.appendChild(metaCharset);
    
    const metaViewport = doc.createElement("meta");
    metaViewport.setAttribute("name", "viewport");
    metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
    head.appendChild(metaViewport);
    
    // Title
    const title = doc.createElement("title");
    title.textContent = "About Me";
    head.appendChild(title);
    
    // Link to external stylesheet
    const linkStylesheet = doc.createElement("link");
    linkStylesheet.setAttribute("rel", "stylesheet");
    linkStylesheet.setAttribute("href", "styles.css");
    head.appendChild(linkStylesheet);
    
    // Content
    const h1 = doc.createElement("h1");
    h1.textContent = "About Me Page";
    body.appendChild(h1);
    
    const h2 = doc.createElement("h2");
    h2.textContent = "2/14/2024";
    body.appendChild(h2);
    
    // First div
    const div1 = doc.createElement("div");
    const h3 = doc.createElement("h3");
    h3.textContent = "My name is Robert Parker.";
    const p1 = doc.createElement("p");
    p1.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Aenean vel elit scelerisque mauris. Amet consectetur adipiscing elit ut. Molestie nunc non blandit massa. Enim blandit volutpat maecenas volutpat blandit. Pellentesque eu tincidunt tortor aliquam. Tellus cras adipiscing enim eu turpis egestas pretium. Purus semper eget duis at tellus at urna condimentum mattis. Pharetra et ultrices neque ornare aenean euismod. Etiam dignissim diam quis enim. In eu mi bibendum neque. Sed euismod nisi porta lorem. <br>This is part of my first div";
    div1.appendChild(h3);
    div1.appendChild(p1);
    body.appendChild(div1);
    
    // Second div
    const div2 = doc.createElement("div");
    const p2 = doc.createElement("p");
    p2.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    div2.appendChild(p2);
    body.appendChild(div2);
    
    // Third div
    const div3 = doc.createElement("div");
    const p3 = doc.createElement("p");
    p3.textContent = "This is my third paragraph in html";
    const linkGithub = doc.createElement("a");
    linkGithub.setAttribute("href", "https://github.com/rparkerrii/Platform_Computing/tree/main");
    linkGithub.textContent = "Link to my github";
    const br = doc.createElement("br");
    const img = doc.createElement("img");
    
    img.src = image;
    
    div3.appendChild(p3);
    div3.appendChild(linkGithub);
    div3.appendChild(br);
    div3.appendChild(img);
    body.appendChild(div3);
    
    // Append head and body to HTML
    html.appendChild(head);
    html.appendChild(body);
    
    // Append HTML to the document body
    document.body.appendChild(html);
    
    const pressButton = doc.createElement("button");
    pressButton.textContent = "Press";
    
    let pressCount = 0;
    
    function handleButtonClick() {
        pressCount++; 
        console.log(`Button pressed ${pressCount} time(s).`); 
    }
    
    pressButton.addEventListener('click', handleButtonClick);
    
    body.appendChild(pressButton);
    
    console.log("ending")
    
}
