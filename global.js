
function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}
const ARE_WE_HOME = document.documentElement.classList.contains("home");

let nav = document.createElement("nav");
document.body.prepend(nav);

let pages = [
	{url: "", title: "Home"},
	{url: "projects/", title: "Projects"},
    {url: "contact/", title: "Contact"},
	{url: "https://github.com/kanarinka", title: "GitHub profile"}
];
for (let p of pages) {
	let url = p.url;
	let title = p.title;
	url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

    nav.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>` );    

}


let navLinks = $$("nav a");
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)
currentLink?.classList.add("current");


/* COLOR SCHEME STUFF */
document.body.insertAdjacentHTML("afterbegin", 
	`<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Auto</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>`
);


localStorage.colorScheme = localStorage.colorScheme ? localStorage.colorScheme : "light dark";
document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);

let select = document.querySelector("select");
select.value = localStorage.colorScheme;

select.addEventListener("input", function (event) {

	document.documentElement.style.setProperty("color-scheme", event.target.value);
	localStorage.colorScheme = event.target.value;
	console.log("from event listener the local storage is "+localStorage.colorScheme)
});

/* BETTER CONTACT FORM */
let form = document.querySelector("form");
form?.addEventListener("submit", function (event) {

	event.preventDefault();
	let data = new FormData(form);
	let url = form.action + "?";
	for (let [name, value] of data) {
		// TODO build URL parameters here
		console.log(name, encodeURIComponent(value));
		url += name + "=" + encodeURIComponent(value) +"&";
		console.log(url);
	}
	location.href = url;

});