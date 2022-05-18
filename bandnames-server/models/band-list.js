const Band = require("./band");



class BandList {

    constructor() {
        this.bands = [
            new Band('Metallica'),
            new Band('Queen'),
            new Band('Kiss'),
            new Band('ACDC')
        ]
    }

    addBand( name ) {
        const newBand = new Band( name );
        this.bands.push( newBand );
        return this.bands;
    }

    removeBand( id ) {
        this.bands = this.bands.filter(eachBand => eachBand.id !== id);
        return this.bands;
    }

    getBands() {
        return this.bands
    }

    increaseVotes( id ) {
        const updatedBands = this.bands.map(band => band.id === id ? {...band, votes: band.votes + 1} : band)
        this.bands = updatedBands
    }

    changeName( id, newName ) {
        this.band = this.bands.map( band => {
            if( band.id === id ) {
                band.name = newName
            }

            return band
        })
    }

}

module.exports = BandList;