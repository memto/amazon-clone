/* eslint-disable */

$(function() {
  $('#instance-search').keyup(function() {
    const searchTerm = $(this).val();

    // console.log(searchTerm);

    $.ajax({
      method: 'POST',
      url: '/api/search',
      data: {
        search_term: searchTerm,
      },
      dataType: 'json',
      success: function onSuccess(results) {
        const data = results.hits.hits.map(hit => hit);
        console.log(data);

        $('#search-results').empty();
        for (let i=0; i < data.length; i++) {
          let html = "";

          html += '<div class="col-md-4">';
          html +=   '<div class="thumbnail">';
          html +=     '<img src="' + data[i]._source.image + '" alt="thumbnail" />';
          html +=     '<div class="caption">';
          html +=       '<a href="/product/' + data[i]._id + '">';
          html +=         '<h3>' + data[i]._source.name + '</h3>';
          html +=       '</a>';
          html +=       '<p>Price: ' + data[i]._source.price + '$</p>';
          html +=       '<p>Category: ' + data[i]._source.category.name + '</p>';
          html +=     '</div>';
          html +=   '</div>';
          html += '</div>';

          $('#search-results').append(html);
        }
      },
      error: function onError(err) {
        console.log(err);
      }
    })
  });

  function onQuantityChanged() {
    const clickedBtn = $(this);

    const quantity = $('#quantity-hidden').val();
    let newQuantity = parseInt(quantity);
    if (clickedBtn.text() == "-" && quantity > 1) {
      newQuantity = parseInt(quantity) - 1;      
    }
    if (clickedBtn.text() == "+") {
      newQuantity = parseInt(quantity) + 1;
    }    
    $('#quantity-hidden').val(newQuantity);
    $('#quantity').html(newQuantity);
    
    const price = $('#price-hidden').val();
    const newTotalPrice = parseFloat(price).toFixed(2) * newQuantity;
    $('#total-price').val(newTotalPrice);
  }

  $('#minus').on('click', onQuantityChanged);
  $('#plus').on('click', onQuantityChanged);
});
