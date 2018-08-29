export function setREM() {
  let html = document.documentElement;

  window.rem = html.getBoundingClientRect().width / 25 ;

  html.style.fontSize = window.rem + 'px';
  

  /*document.getElementsByTagName("html")[0].style.fontSize=Math.floor(document.documentElement.clientWidth*100000/36)/100000+"px";*/
  //1rem = 15px
}