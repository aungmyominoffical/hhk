var UIController = (function(){
    var DOMString = {
        input : '#input',
        from : '#from',
        to   : '#to',
        clacBtn : '.calcBtn',
        calc : '.calc',
        result : '.result',
        historyList : '.history-list',
    }

    var createOption = function(x,y,a){
        var option = document.createElement('option');
        var text = document.createTextNode(y);
        option.appendChild(text);
        x.appendChild(option);
        option.setAttribute('value',toNum(a));
    }

    var toNum = function(x){
        return Number(x.replace(',',''));
    }

    var no = 0;
    var historyList = document.querySelector(DOMString.historyList);
    var localKeys = Object.keys(localStorage);
    var keySorting = localKeys.sort();
    var rowSpacer = document.getElementById('rowSpacer');

    if(keySorting.length > 0){
        no = Number(keySorting[keySorting.length - 1]) + 1;
    }
    
    return {
        setData : function(){
            var from = document.querySelector(DOMString.from);
            var to   = document.querySelector(DOMString.to);

            for(x in data.rates){   
                createOption(from,x,data.rates[x]);
                createOption(to,x,data.rates[x]);
            }
        },
        getDOMString : function(){
            return DOMString;
        },
        getInput : function(){
            return {
                input : Number(document.querySelector(DOMString.input).value),
                from  : Number(document.querySelector(DOMString.from).value),
                to    : Number(document.querySelector(DOMString.to).value) 
            }
        },
        calculateResult : function(inputData){
            var first = inputData.input * inputData.from;
            var second = first * inputData.to;
            var secondFix = second.toFixed(2);

            var result = document.querySelector(DOMString.result);
            result.innerHTML = secondFix;
            input.value = 0;
            input.focus();
        },
        insertDataTable : function(inputData){
            if(rowSpacer){
                rowSpacer.style.display = 'none';
            }
            var date = new Date().toLocaleString();
            var fromText = inputData.input+" "+ from.options[from.selectedIndex].innerHTML;
            var toText = from.options[from.selectedIndex].innerHTML;

            var first = inputData.input * inputData.from;
            var second = first / inputData.to;
            var secondFix = second.toFixed(2);

            listItem = `
                <tr id="identity-${no}">
                    <td>${date}</td>
                    <td>${fromText}</td>
                    <td>${toText}</td>
                    <td>${secondFix}</td>
                    <td><i class="fas fa-trash"></i></td>
                </tr> 
            `;  

            historyList.innerHTML += listItem;

            no++;
              
        }   
    }
})()


var mainController = (function(UICtrl){
    var DOM = UICtrl.getDOMString();
    var input = document.querySelector(DOM.input);
    var form = document.querySelector(DOM.form);
    var to = document.querySelector(DOM.to);

    var setEventStart = function(){
        
        document.querySelector(DOM.clacBtn).addEventListener('click',ctrlAddItem);

        document.querySelector(DOM.historyList).addEventListener('click',ctrlDeleteItem);
    }   

    var ctrlDeleteItem = function(e){
        var itemID = e.target.parentNode.parentNode.id;
        var trList = document.querySelectorAll('.history-list tr');

        if(itemID){
            var element = document.getElementById(itemID);
            element.remove();
        }   
        
        var newTrList = Array.prototype.slice.call(trList);
        var rowSpacer = document.getElementById('rowSpacer');
        if(newTrList.length === 2){
            console.log(newTrList.length);
            rowSpacer.style.display = 'contents';
        }
    }

    var ctrlAddItem = function(e){
        // 1 get data form ui
        var inputData = UICtrl.getInput();
        if(input.value !== "" && input.value > 0 && from.value !== '' && to.value !== ''){
            // console.log(inputData);
            UICtrl.calculateResult(inputData);
            // 2 insert data table to Ui
            UICtrl.insertDataTable(inputData);
        }
    }

    return {
        start : function(){
            UICtrl.setData();
            return setEventStart();        
        }
    }

})(UIController)

mainController.start();

function changeMode(){
    document.body.classList.toggle('night-mode');
    document.getElementById('modeIcon').classList.toggle('fa-sun');
}
