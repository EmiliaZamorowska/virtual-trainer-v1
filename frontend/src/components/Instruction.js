function Instruction({exercise}){
    var dictTitle = {
        "WYCISKANIE NAD GŁOWĘ": "https://s3.amazonaws.com/prod.skimble/assets/1904357/image_iphone.jpg",
        "UGINANIE RAMION": "https://s3.amazonaws.com/prod.skimble/assets/2287282/image_iphone.jpg",
        "WZNOSY BOKIEM": "https://i.ibb.co/BycFSC2/lateral-Rise.jpg",
        "PROSTOWANIE PRZEDRAMIENIA W OPADZIE": "https://i.ibb.co/BgnZyXV/tricep.jpg",
        "WIOSŁOWANIE W OPADZIE": "https://i.ibb.co/vqWKrZV/row.jpg"
      };
      var dictP = {
        "WYCISKANIE NAD GŁOWĘ": "Należy unieść ramiona z równoczesnym wyprostem w stawach łokciowych i podnieść hantle nad głowę. Ciężary mogą lekko schodzić się do środka w momencie, gdy są nad głową. Ćwiczenie może być wykonywane w pozycji stojącej.",
        "UGINANIE RAMION": "Postawą wyjściową ćwiczenia jest pozycja stojąca z ramionami ułożonymi wzdłuż ciała oraz hantlami trzymanymi w dłoniach w pozycji neutralnej (kciuki skierowane w przód). Uginanie ma odbywać się z jednoczesną rotacją zewnętrzną, aby finalnie dłoń była skierowana kciukiem na zewnątrz. Ruch ma być kontrolowany, sylwetka stabilna.",
        "WZNOSY BOKIEM": "Lekko uginamy położone równolegle do sylwetki ramiona. Unosimy hantle aż do uzyskania prostopadłości względem tułowia. Ramiona prowadzimy równo, łokieć i nadgarstek ułożone są na podobnej wysokości.",
        "PROSTOWANIE PRZEDRAMIENIA W OPADZIE": "Należy pochylić się jak najbardziej do przodu. Trzymając nieruchomo ramiona, wykonujemy wyprost w stawach łokciowych, unosząc ciężar za siebie.",
        "WIOSŁOWANIE W OPADZIE": "Pozycją wyjściową ćwiczenia jest pochylenie sylwetki przy jednoczesnym wyprostowaniu pleców. Trzymając przedramię w pionie należy przyciągnąć ciężar do siebie. W momencie powrotu do pozycji wyjściowej wskazane jest całkowite wyprostowanie ramienia."
      };
    return(
        <div style={{marginTop: '1%'}} className="instruction">
            <h3>{exercise}</h3>
            <img style={{height:'30%', width: '95%', objectFit:'scale-down'}} src={dictTitle[exercise]}></img>
            <p>{dictP[exercise]}</p>
        </div>
    )
}

export default Instruction;