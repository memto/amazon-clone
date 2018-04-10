/* eslint-disable */

$(function() {
  $('#instance-search').keyup(function() {
    const searchTerm = $(this).val();

    console.log(searchTerm);

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
      },
      error: function onError(err) {
        console.log(err);
      }
    })
  });
});
