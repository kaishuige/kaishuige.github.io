var phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

var companyReg = /\d{6}/

// var nameReg =  /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]*$/
var nameReg = /^[\x00-\xff\w\-\,]{3,20}$/
var possword = /^[a-zA-Z]\w{5,17}$/

var arr = [phoneReg, companyReg, nameReg, possword]

// var inputs = document.querySelectorAll('.stage .verify input')

// var input = document.querySelector('#input')
var inputs = document.querySelectorAll('.mobile input')
var active = document.querySelectorAll('.active')
var con = document.querySelectorAll('.con')
var empty = document.querySelectorAll('.empty')
var btn = document.querySelector('.btn')

// input.onblur = function () {

//     // console.log(('xxx'));
//     // console.log(this.value);
//     if (!this.value) {
//         console.log('XXX');

//         empty.style.display = 'block'
//         con.style.display = 'none'
//         active.style.display = 'none'
//     } else if (!phoneReg.test(this.value) && this.value) {
//         con.style.display = 'block'
//         active.style.display = 'none'
//         empty.style.display = 'none'
//     }

//     if (phoneReg.test(this.value)) {
//         active.style.display = 'block'
//         con.style.display = 'none'
//         empty.style.display = 'none'
//     }

// }



inputs.forEach(function (input, index, inputs) {

    console.log(arr[index]);


    input.onblur = function () {
        // console.log(this);
        if (!this.value) {

            empty[index].style.display = 'block'
            con[index].style.display = 'none'
            active[index].style.display = 'none'
        } else if (!arr[index].test(this.value)) {
            con[index].style.display = 'block'
            active[index].style.display = 'none'
            empty[index].style.display = 'none'
        }
        else {
            active[index].style.display = 'block'
            con[index].style.display = 'none'
            empty[index].style.display = 'none'
        }

    }
})

// btn.onclick = function(){
//     this.
// }



