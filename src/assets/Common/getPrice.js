
function getPrice(grosor,longitud,producto,presentacion){
    if(presentacion==="Par"){
        return PrecioPar(longitud);
    }
    else{
        return PrecioGruesa(grosor,longitud,producto);
    }
}

function PrecioPar(longitud){
    if( longitud>=40 && longitud<90){
        return 10;
    }
    else if( longitud>=90 && longitud<130){
        return 15;
    }
    else{
        return 20;
    } 
}

function PrecioGruesa(grosor,longitud,producto){
    switch(producto){
        case "Cordon":            
            return PrecioCordon(grosor,longitud);
        case "Cordon Moteado":
            return PrecioCordon(grosor,longitud);
        case "Diamante":
            return PrecioDiamante(grosor,longitud);
        case "Diamante Moteado":
            return PrecioDiamante(grosor,longitud);
        case "Taiwan":
            return PrecioTaiwan(grosor,longitud);
        case "Americana":
            return PrecioAmericana(grosor,longitud);
        case "Cordon Special Colors":
            return PrecioCSColors(grosor,longitud);
        default:
            return 0;

    }

}

function PrecioCordon(grosor,longitud){
    switch(grosor){
        case "3":
            return (2*(1.1455*longitud-0.75));

        default:
            return 0;
    }
}
function PrecioDiamante(grosor,longitud){
    switch(grosor){
        case "6":
            return (2*(1.1625*longitud-1.0167));
        case "7":
            return (2*(1.1570*longitud+0.4));
        case "8":
            return (2*(1.16269*longitud+2.30897));
        case "10":
            return (2*(1.3244*longitud-0.0519));
        case "12":
            return (2*(1.5544*longitud-0.0911));
        case "14":
            return (2*(1.784423*longitud+0.231410));
        case "16":
            return (2*(1.0144*longitud-0.3717));
        case "18":
            return (2*(2.2445*longitud-0.5121));
        default:
            return 0;
    }
}

function PrecioTaiwan(grosor,longitud){
    return (2*(1.784423*longitud+0.231410));
}
function PrecioAmericana(grosor,longitud){
    return (2*(1.784423*longitud+0.231410));
}

function PrecioCSColors(grosor,longitud){
    return (2*(1.784423*longitud+0.231410));
}

export {getPrice}