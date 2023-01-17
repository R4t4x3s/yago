async function run(interest, quoteService, adviceEngine, nacebelEngine) {
   let rc_pro_interest = interest
   rc_pro_interest.nacebelCodes = nacebelEngine.get_codes(interest.sector) 
   let advice = adviceEngine.generate_rc_pro(rc_pro_interest)
   let quote = await quoteService.post('professional-liability',rc_pro_interest)
   let simulation = {
       quote,
       advice
   }
   return simulation 
}


module.exports = {
    run
}
