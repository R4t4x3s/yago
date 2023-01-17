function generate_rc_pro(rc_pro_interest){
    // some insane logic 
    return {
        deductibleFormula: 'small',
        coverageCeilingFormula: 'large',
        covers: ['legalExpenses']
    }
}

module.exports = {
    generate_rc_pro
}
