// taken from https://ben.akrin.com/canvas_fill/fill_05.html

function flood_fill( the_canvas, the_canvas_context, original_x, original_y, color ) {
    original_color = the_canvas_context.getImageData( original_x, original_y, 1, 1 ).data ;
    original_color = { r:original_color[0],
                       g:original_color[1],
                       b:original_color[2],
                       a:original_color[3] } ;

    x = original_x ;
    y = original_y ;
    boundary_pixels = the_canvas_context.getImageData( 0, 0, the_canvas.width, the_canvas.height ) ;

    // first we go up until we find a boundary
    linear_cords = (y * the_canvas.width + x) * 4 ;
    var done = false ;
    while( y>=0 && !done ) {
        var new_linear_cords = ( (y-1) * the_canvas.width + x ) * 4 ;
        if( boundary_pixels.data[new_linear_cords]==original_color.r &&
            boundary_pixels.data[new_linear_cords+1]==original_color.g &&
            boundary_pixels.data[new_linear_cords+2]==original_color.b &&
            boundary_pixels.data[new_linear_cords+3]==original_color.a ) {
            y = y - 1 ;
            linear_cords = new_linear_cords ;
        } else {
            done = true ;
        }
    }
    // then we loop around until we get back to the starting point
    var path = [{x:x, y:y}] ;
    var first_iteration = true ;
    var iteration_count = 0 ;
    var orientation = 1 ; // 0:^, 1:<-, 2:v, 3:->
    while( !(path[path.length-1].x==path[0].x && path[path.length-1].y==path[0].y) || first_iteration ) {
        iteration_count++ ;
        first_iteration = false ;
        var got_it = false ;

        if( path.length>=2 ) {
            if( path[path.length-1].y-path[path.length-2].y<0 ) {
                orientation = 0 ;
                //console.log( "^" ) ;
            } else if( path[path.length-1].x-path[path.length-2].x<0 ) {
                orientation = 1 ;
                //console.log( "<-" ) ;
            } else if( path[path.length-1].y-path[path.length-2].y>0 ) {
                orientation = 2 ;
                //console.log( "v" ) ;
            } else if( path[path.length-1].x-path[path.length-2].x>0 ) {
                orientation = 3 ;
                //console.log( "->" ) ;
            } else {
                //console.log( "we shouldn't be here" ) ;
            }
        }

        for( var look_at=0 ; !got_it && look_at<=3 ; look_at++ ) {
            var both = (orientation + look_at) % 4 ;
            if( both==0 ) {
                // we try right
                if( !got_it && (x+1)<the_canvas.width ) {
                    linear_cords = (y * the_canvas.width + (x+1)) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        x = x + 1 ;
                    }
                }
            } else if( both==1 ) {
                // we try up
                if( !got_it && (y-1)>=0 ) {
                    linear_cords = ((y-1) * the_canvas.width + x) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        y = y - 1 ;
                    }
                }
            } else if( both==2 ) {
                // we try left
                if( !got_it && (x-1)>=0 ) {
                    linear_cords = (y * the_canvas.width + (x-1)) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        x = x - 1 ;
                    }
                }
            } else if( both==3 ) {
                // we try down
                if( !got_it && (y+1)<the_canvas.height ) {
                    linear_cords = ((y+1) * the_canvas.width + x) * 4 ;
                    if( boundary_pixels.data[linear_cords]==original_color.r &&
                        boundary_pixels.data[linear_cords+1]==original_color.g &&
                        boundary_pixels.data[linear_cords+2]==original_color.b &&
                        boundary_pixels.data[linear_cords+3]==original_color.a ) {
                        got_it = true ;
                        y = y + 1 ;
                    }
                }
            }
        }

        if( got_it ) {
            path.push( {x:x, y:y} ) ;
        }
    }
    
    draw_quadratic_curve( path, the_canvas_context, color, 1, color ) ;
}

function draw_quadratic_curve( path, ctx, color, thickness, fill_color ) {
    color = "rgba( " + color.r + "," + color.g + ","+ color.b + ","+ color.a + ")" ;
    fill_color = "rgba( " + fill_color.r + "," + fill_color.g + ","+ fill_color.b + ","+ fill_color.a + ")" ;
    ctx.strokeStyle = color ;
    ctx.fillStyle = fill_color ;
    ctx.lineWidth = thickness ;
    ctx.lineJoin = "round" ;
    ctx.lineCap = "round" ;
    //ctx.fillStyle = fill_color ;

    if( path.length>0 ) { // just in case
        if( path.length<3 ) {
            var b = path[0] ;
            ctx.beginPath() ;
            ctx.arc( b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0 ) ;
            ctx.fill() ;
            ctx.closePath();

            //return ;
        } else {
            ctx.beginPath() ;
            ctx.moveTo( path[0].x, path[0].y ) ;
            for( var i = 1; i<path.length-2; i++ ) {
                var c = (path[i].x + path[i + 1].x) / 2 ;
                var d = (path[i].y + path[i + 1].y) / 2 ;
                ctx.quadraticCurveTo( path[i].x, path[i].y, c, d ) ;
            }

            // the last 2 points are special
            ctx.quadraticCurveTo( path[i].x, path[i].y, path[i + 1].x, path[i + 1].y ) ;
            ctx.stroke() ;
        }
    }
    if( fill_color!==false ) {
        ctx.fill() ;
    }
}

function generate_random_color() {
    var letters = '0123456789ABCDEF' ;
    var color = '#' ;
    for( var i=0; i<6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)] ;
    }
    return color ;
}

// adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function color_to_rgba( color ) {
    if( color[0]=="#" ) { // hex notation
        color = color.replace( "#", "" ) ;
        var bigint = parseInt(color, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return {r:r,
                g:g,
                b:b,
                a:255} ;
    } else if( color.indexOf("rgba(")==0 ) { // already in rgba notation
        color = color.replace( "rgba(", "" ).replace( " ", "" ).replace( ")", "" ).split( "," ) ;
        return {r:color[0],
                g:color[1],
                b:color[2],
                a:color[3]*255} ;
    } else {
        console.error( "warning: can't convert color to rgba: " + color ) ;
        return {r:0,
                g:0,
                b:0,
                a:0} ;
    }
}