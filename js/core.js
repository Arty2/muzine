/*--------------------------------------------------------------
randomizer
	seed
	column array
	height array
	left or right align
	image weight / height
--------------------------------------------------------------*/

/*--------------------------------------------------------------
Read GET variables
via https://ericholmes.ca/retreive-get-variables-in-javascript-from-a-url-string/
--------------------------------------------------------------*/
function get_vars( url ) {
	var vars = {};
	var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}

var url = document.URL;
var query = get_vars(url)['q'].split(',');

console.log(query);

/*--------------------------------------------------------------
Seed random
via https://github.com/davidbau/seedrandom
Usage: Math.seedrandom('hello.');
--------------------------------------------------------------*/
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;q>a;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/(4*(1<<30))},u["double"]=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);l>e;)g[e]=e++;for(e=0;l>e;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(g){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{if(j)return i(j.randomBytes(l));var b=new Uint8Array(l);return(k.crypto||k.msCrypto).getRandomValues(b),i(b)}catch(c){var d=k.navigator,e=d&&d.plugins;return[+new Date,k,e,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(t){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);

function rand(arr,seed) {
	// return arr[Math.floor(Math.random() * arr.length)];
	var rng = new Math.seedrandom(get_vars(url)['q']+seed+Math.round(Date.now()/100000));
	return arr[Math.floor(rng() * arr.length)]
}

/*--------------------------------------------------------------
Helper functions
--------------------------------------------------------------*/
function cut(n,text) {
	var short = text.substr(0, n);
	if (/^\S/.test(text.substr(n)))
		return short.replace(/\s+\S*$/, "");
	return short;
}

/*--------------------------------------------------------------
Layout
--------------------------------------------------------------*/
var block_position = [
	'col-4-12',
	'col-4-12',
	'col-5-12',
	'col-8-12',
	'col-5-12',
	'col-6-12',
	'col-3-12',
];

var block_offset = [
	'push-3-12',
	'push-1-12',
	'push-2-12',
	'push-2-12',
	'push-1-12',
	'push-6-12',
	'push-2-12',
];

var block_length = [
	'300',
	'500',
	'100',
	'200',
	'300',
	'500',
];

var img_class = [
	'none',
	'darken',
	'darken',
	'backdrop',
];



/*--------------------------------------------------------------
Populate with content
--------------------------------------------------------------*/

// var query = ['2','1','3','0','7','9','4'];
console.log(query);

jQuery('#permalink').text(url);

jQuery.each(query, function(key, value) {
	// jQuery('#tags').append($('
	// <li>'+exhibit_title[this]+'</li>
	// '));
	console.log(exhibit_title[value]);

	$('#tags').append('<li>'+exhibit_title[value]+'</li>');


	$('#content').append('<div class="'+
		rand(block_position,value)+
		' '+rand(block_offset,value)+
		'">'+
		'<h2>'+exhibit_title[value]+'</h2>'+
		'<h3>'+exhibit_subtitle[value]+'</h3>'+
		'<img class="'+rand(img_class,value)+'" src="'+exhibit_img[value]+'">'+
		'<p>'+cut(rand(block_length,value),exhibit_text[value])+'</p></div>');

});



console.log('* muzine rocks *');