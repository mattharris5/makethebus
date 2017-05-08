$(function() {
  var stops = window.location.hash.split("#stops=")[1].split(',')
  var url = 'http://webservices.nextbus.com/service/publicXMLFeed?a=sf-muni&command=predictionsForMultiStops'
  url = url + $.map(stops, function(stop) {
    console.log(stop)
    return '&stops=' + stop;
  }).join('')

  console.log(url)

$.ajax({
  url: url
})
  .done(function( xml ) {
    $xml = $( xml ),
    $tmpl = $.templates("#predictionTemplate");
    $container = $("ul.predictions");

    console.log( $xml.find("predictions") )

    $xml.find("predictions").each( function( index, prediction ) {
      $prediction = $( prediction )

      $prediction.find("direction").each( function( index, direction ) {
        $direction = $( direction )

        var data = {
          route: $prediction.attr("routeTag"),
          stop: $prediction.attr("stopTitle"),
          direction: $direction.attr("title"),
          times: $.makeArray(
            $direction.find("prediction").map(function( index ) {
              if (index > 2) return;
              return {
                minutes: $(this).attr('minutes'),
                index: index
              }
            })
          )
        };

        $container.append(
          $tmpl.render( data )
        );
      })
    })


  });





});
