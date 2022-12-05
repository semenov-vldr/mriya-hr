const dateInputList = document.querySelectorAll('input[name="date"]');

if (dateInputList) maskDate(dateInputList)

function maskDate (dateInputList) {

  dateInputList.forEach(dateInput => {
    Inputmask({"mask": "99.99.9999"}).mask(dateInput);
  })

}
