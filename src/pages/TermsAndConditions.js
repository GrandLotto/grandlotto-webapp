import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bodyScrollTop } from "../global/customFunctions";
import { setPageLoading } from "../store/alert/alertSlice";
import { useDispatch } from "react-redux";

const TermsAndConditions = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [hasAcceptTerms, sethasAcceptTerms] = useState(false);

  useLayoutEffect(() => {
    bodyScrollTop();
  }, [location]);

  useEffect(() => {
    (async () => {
      const hasAcceptedTerms = localStorage.getItem("aTt");
      if (hasAcceptedTerms) {
        sethasAcceptTerms(true);
      } else {
        sethasAcceptTerms(false);
      }
    })();
  }, []);

  const handlecceptedTerms = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    setTimeout(() => {
      dispatch(
        setPageLoading({
          status: false,
          message: "",
        })
      );

      localStorage.setItem("aTt", "yes");
      sethasAcceptTerms(true);
    }, 1500);
  };

  return (
    <div className="oauthHasWeight">
      <div className="row">
        <div className="col-md-8 mx-auto oauthHasWeightCol">
          <h3>Terms and Conditions</h3>
          <p className="text-gray">Updated 18th April 2022</p>
          <p className="text-gray">
            Please note that by accepting these terms and conditions you
            acknowledge that you have read and agree to them.
          </p>
          <div className="mt-5">
            <div className="mb-5">
              <h4 className="t_title">
                <span>1.</span>
                <span>Agreeing to the Terms and Conditions</span>
              </h4>
              <p className="p_para">
                <span>1.1</span>
                <span>
                  These Terms and Conditions apply to, and govern your use of
                  www.grandlotto.ng (“Website”), including all services,
                  functionality, software and games made available via the
                  Website ("Services"). By registering on the Website and
                  accepting these Terms and Conditions, you enter into a legally
                  binding agreement that incorporates our Privacy Policy and
                  Cookies Policy and the rules for each game available via the
                  Website (“Game Rules”). Specific Services may have their own
                  terms and conditions (for example, in relation to a particular
                  promotion or bonus) . Those terms will also be incorporated
                  into these Terms and Conditions once you accept them.
                </span>
              </p>
              <p className="p_para">
                <span>1.2</span>
                <span>
                  Please note that the terms and conditions for specific
                  Services shall prevail in the event of any conflict between
                  such terms and these Terms and Conditions.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>2.</span>
                <span>Parties</span>
              </h4>
              <p className="p_para">
                <span>2.1</span>
                <span>
                  These Terms and Conditions are a binding legal agreement
                  between you and The Grandlotto (Subsidiary of Lotgrand
                  Limited), a company registered in Nigeria (company number
                  1222087 with its registered office at 17,Yinusa Adeniji street
                  Ikeja, Lagos) For further contact details please see contact
                  us.
                </span>
              </p>
              <p className="p_para">
                <span>2.2</span>
                <span>
                  References in these Terms and Conditions to "us", "our" or
                  "we" are references to Grandlotto, and references to "you" and
                  "your" are to you as the end user of the Website/Betshop
                  and/or the Services.
                </span>
              </p>
              <p className="p_para">
                <span>2.3</span>
                <span>
                  References in these Terms and Conditions to "us", "our" or
                  "we" are references to Grandlotto, and references to "you" and
                  "your" are to you as the end user of the Website/Betshop
                  and/or the Services.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>3.</span>
                <span>Changes to the Terms and Conditions</span>
              </h4>
              <p className="p_para">
                <span>3.1</span>
                <span>
                  These Terms and Conditions govern your use of the Website and
                  the Services and supersede any and all prior agreements
                  between you and us.
                </span>
              </p>
              <p className="p_para">
                <span>3.2</span>
                <span>
                  We may change these Terms and Conditions at any time in order
                  to reflect changes to the Website and/or the Services,
                  including additional products or services offered by us or a
                  third party. We will publish any changes to these Terms and
                  Conditions on the Website and we will give you at least seven
                  (7) days' advance notice (by, at our sole discretion, emailing
                  you and/or providing a prompt on the Website and/or publishing
                  a notice and the revised terms and conditions on the Website).
                  Your continued use of the Website and the Services following
                  notification or, as the case may be, such advance notice will
                  be deemed binding acceptance of the modification. If any such
                  change is unacceptable to you, you should not continue to use
                  the Website and the Services.
                </span>
              </p>
              <p className="p_para">
                <span>3.4</span>
                <span>
                  It is your sole responsibility to review the Terms and
                  Conditions (including the Game Rules) and any amendments to
                  them each time you use the Website/Betshop and/or the
                  Services.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>4.</span>
                <span>Intellectual Property</span>
              </h4>
              <p className="p_para">
                <span>4.1</span>
                <span>
                  You acknowledge and agree that all copyright, trade marks and
                  other intellectual property rights in all material or content
                  supplied or made available by us via the Website or otherwise
                  to you shall remain at all times vested in us or our
                  licensors. You are permitted to use this material only as
                  expressly authorized by us or our licensors.
                </span>
              </p>
              <p className="p_para">
                <span>4.2</span>
                <span>
                  You acknowledge and agree that the material and content
                  contained within the Website and utilized in the provision of
                  the Services is made available by us to you for your own
                  personal non-commercial use only. Any other use of such
                  material and content is strictly prohibited. You agree not to
                  (and agree not to assist or facilitate any third party to)
                  copy, reproduce, transmit, publish, display, distribute,
                  commercially exploit, tamper with or create derivative works
                  of such material and content.
                </span>
              </p>
              <p className="p_para">
                <span>4.3</span>
                <span>
                  The names, images and logos identifying us, our partners or
                  other third parties and our/their products and services
                  contained on the platform are proprietary marks and may not be
                  reproduced or otherwise used without express permission.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>5.</span>
                <span>Compliance with laws</span>
              </h4>
              <p className="p_para">
                <span>5.1</span>
                <span>
                  Access to certain Services may not be legal for some or all
                  residents of, or persons present in, certain countries. We do
                  not intend that the Website and/or the Services be used by
                  persons in countries in which such activities are illegal. The
                  Website and/or the Services do not constitute an offer,
                  solicitation or invitation by us for the use of, or
                  registration for, betting or other services in any
                  jurisdiction in which such activities are prohibited by law.
                </span>
              </p>
              <p className="p_para">
                <span>5.2</span>
                <span>
                  It is your responsibility to determine the law that applies in
                  the location in which you are present. You should ensure that
                  you are acting legally in that jurisdiction in registering as
                  our customer and/or betting via the Website and/or using the
                  Services
                </span>
              </p>
              <p className="p_para">
                <span>5.3</span>
                <span>
                  We accept no liability if your use of the Website and/or the
                  Services and/or placing a bet is in contravention of the law
                  of your home state or the country in which you are present.
                  However, if at any time we believe your use/participation is
                  in contravention of such law, we shall be entitled to exclude
                  you from using the Website and/or the Services as we see fit
                  and declare void any bets placed by you, in which event no
                  winnings will be paid in relation to such bets.
                </span>
              </p>
              <p className="p_para">
                <span>5.4</span>
                <span>
                  You are responsible for reporting your winnings and losses if
                  such reporting is required by your local law or tax
                  authorities. It is your responsibility to pay any tax or levy
                  due on any winnings paid to you by us.
                </span>
              </p>
              <p className="p_para">
                <span>5.5</span>
                <span>
                  You must be at least 18 years old to use the Website and/or
                  the Services and to place a bet. By opening an account with us
                  ("Player Account") you confirm that you are aged 18 or older.
                  Underage gambling is a criminal offence.
                </span>
              </p>
              <p className="p_para">
                <span>5.6</span>
                <span>
                  By agreeing to these Terms and Conditions you authorise us to
                  check with a third party the details you provide when
                  registering with the Website or changing your Player Account
                  details. This may include supplying the details that you have
                  provided to authorised credit reference agencies. In
                  particular, we may verify that you are 18 years old or over or
                  that you are resident in the country in which you say you are
                  a resident and/or that you are the owner of the credit/debit
                  card and bank account that is registered to your Player
                  Account and any sums deposited in your Player Account. To help
                  us combat fraud efficiently, in certain circumstances we may
                  ask you to provide physical copies of your personal
                  identification documents in order to verify your registration
                  details.
                </span>
              </p>
              <p className="p_para">
                <span>5.7</span>
                <span>
                  You will not be able to withdraw winnings from your Player
                  Account or otherwise receive any winnings until age
                  verification has been successfully completed. In any event, if
                  we have not been able to verify your age within a maximum
                  period of 72 hours of you registering with us and (i)
                  depositing money in your Player Account or (ii) you supplying
                  details of a valid bank account which accepts Direct Debit
                  payments (or, if applicable, you making a card transaction
                  payment) in respect of your Player Account then your Player
                  Account will be frozen and no further gambling will be
                  permitted until age verification has been successfully
                  completed.
                </span>
              </p>
              <p className="p_para">
                <span>5.8</span>
                <span>
                  If age verification reveals that you are not 18 years old or
                  over then all deposits or Direct Debit payments or other card
                  transaction payments made by you will be returned to you, no
                  winnings will be paid and your Player Account will be closed.
                </span>
              </p>
              <p className="p_para">
                <span>5.9</span>
                <span>
                  ONLY individuals are permitted to use www.grandlotto.ng. If
                  discovered that an organization is responsible for funding an
                  account, Grandlotto has the right to withdraw/withhold past
                  winnings and take legal actions.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>6.</span>
                <span>Limitations and exclusions</span>
              </h4>
              <p className="p_para">
                <span>6.1</span>
                <span>Nothing in these Terms and Conditions will:</span>
              </p>
              <p className="p_para">
                <span>6.1.1</span>
                <span>
                  exclude or limit our liability for fraud or fraudulent
                  misrepresentation or for death or personal injury resulting
                  from our negligence; or
                </span>
              </p>
              <p className="p_para">
                <span>6.1.2</span>
                <span>
                  restrict your statutory rights (statutory rights include, for
                  example, that we will provide the Website and the Services to
                  a reasonable standard and within a reasonable time).
                </span>
              </p>
              <p className="p_para">
                <span>6.2</span>
                <span>
                  Except under paragraph 6.1 above and save in respect of any
                  winnings lawfully due to you in accordance with these Terms
                  and Conditions, our maximum liability to you under these Terms
                  and Conditions in relation any one incident or series of
                  related incidents is limited to the greater of: (a) any net
                  losses incurred by you during the three (3) month period prior
                  to any claim; or (b) Ten thousand Naira (N10,000).
                </span>
              </p>
              <p className="p_para">
                <span>6.3</span>
                <span>
                  Subject always to paragraph 6.1 above, we will not be
                  responsible under these Terms and Conditions for any loss that
                  could not have been reasonably expected by you and us at the
                  time you registered with the Website or at the time you
                  entered into a transaction with us (for example, any loss of
                  income, business or profits or any information which is lost
                  or corrupted) and, in any event, we will not be liable for any
                  damage or loss suffered or incurred by you as a result of:
                </span>
              </p>
              <p className="p_para">
                <span>6.3.1</span>
                <span>
                  any use of the Website and/or the Services in breach of these
                  Terms and Conditions (including any use of the Website and/or
                  the Services for commercial or business purposes);
                </span>
              </p>
              <p className="p_para">
                <span>6.3.2</span>
                <span>
                  failures caused by the equipment you use to access the Website
                  and/or the Services or failures in any network (including
                  failures by your internet service provider);
                </span>
              </p>
              <p className="p_para">
                <span>6.3.3</span>
                <span>
                  any lost or delayed transactions (including as a result of
                  technical failure);
                </span>
              </p>
              <p className="p_para">
                <span>6.3.4</span>
                <span>
                  damage to your computer or for any loss or corruption of data
                  that results from your use of the Website and/or the Services
                  (and we cannot and do not guarantee that any files that you
                  download are free from viruses, contamination or destructive
                  features); or
                </span>
              </p>
              <p className="p_para">
                <span>6.3.5</span>
                <span>
                  Our cancellation or suspension of the Services in accordance
                  with these Terms and Conditions.
                </span>
              </p>
              <p className="p_para">
                <span>6.4</span>
                <span>
                  We do not guarantee which Services will be available on the
                  Website. The Services and the Website are provided on an 'as
                  is' and 'as available' basis. We cannot promise that the
                  Website and the Services will be free from errors or omissions
                  nor that they will be available uninterrupted and in a fully
                  operating condition. We will provide the Services with the
                  reasonable skill and care described in these Terms and
                  Conditions. We do not make any other promises about how the
                  Services will be provided to you or about your access to the
                  Website.
                </span>
              </p>
              <p className="p_para">
                <span>6.5</span>
                <span>
                  The Website may contain links to third party websites and
                  services through advertising or otherwise. These links are
                  provided for your ease of reference and convenience only. We
                  have no control over those third party websites or services
                  and are not responsible for their content. We do not endorse
                  the material contained on their websites or services, and have
                  no association with their operators. You agree that we will
                  not be party to any transaction or contract with a third party
                  that you may enter into and we will not be liable to you for
                  any loss or damage which you may suffer by using those third
                  party websites and services. You agree that you will not
                  involve us in any dispute you may have with such third party
                  websites and services.
                </span>
              </p>
              <p className="p_para">
                <span>6.5</span>
                <span>
                  The Website may contain links to third party websites and
                  services through advertising or otherwise. These links are
                  provided for your ease of reference and convenience only. We
                  have no control over those third party websites or services
                  and are not responsible for their content. We do not endorse
                  the material contained on their websites or services, and have
                  no association with their operators. You agree that we will
                  not be party to any transaction or contract with a third party
                  that you may enter into and we will not be liable to you for
                  any loss or damage which you may suffer by using those third
                  party websites and services. You agree that you will not
                  involve us in any dispute you may have with such third party
                  websites and services.
                </span>
              </p>
              <p className="p_para">
                <span>6.5.1</span>
                <span>
                  The Website may contain links to third party websites and
                  services through advertising or otherwise. These links are
                  provided for your ease of reference and convenience only. We
                  have no control over those third party websites or services
                  and are not responsible for their content. We do not endorse
                  the material contained on their websites or services, and have
                  no association with their operators. You agree that we will
                  not be party to any transaction or contract with a third party
                  that you may enter into and we will not be liable to you for
                  any loss or damage which you may suffer by using those third
                  party websites and services. You agree that you will not
                  involve us in any dispute you may have with such third party
                  websites and services.
                </span>
              </p>
              <p className="p_para">
                <span>6.6</span>
                <span>
                  We are not responsible for any events beyond our reasonable
                  control. Such events might include war, terrorist activity,
                  riots, malicious damage, fire, flood, storm, nuclear accident
                  or compliance with any new law or governmental order, rule,
                  regulation or direction.
                </span>
              </p>
              <p className="p_para">
                <span>6.7</span>
                <span>
                  We may suspend the Website and/or the Services or any part of
                  them if, despite making reasonable efforts to do so, we are
                  not able to provide that part of the Services and/or Website
                  to you as a result of events beyond our reasonable control.
                  However, if we suspend all or any part of the Services and/or
                  the Website because of one of these events, we may refund to
                  you any monies that you stake where the product for which such
                  monies were staked is not available as a result of such an
                  event.
                </span>
              </p>
              <p className="p_para">
                <span>6.8</span>
                <span>
                  You agree to compensate us in respect of any damages suffered
                  by us or any of our losses resulting from any claim made by a
                  third party in each case in respect of any matter arising from
                  your use of the Website and/or the Services in breach of these
                  Terms and Conditions or from your breach of any applicable law
                  or regulation.
                </span>
              </p>
              <p className="p_para">
                <span>6.9</span>
                <span>
                  You acknowledge that our random number generator will
                  determine the outcome of the instant win games available on
                  the Website and you accept the outcomes of all such games. You
                  further agree that, in the unlikely event of a disagreement
                  between the result that appears on the software and the game
                  server, the result that appears on the game server will
                  prevail. You acknowledge and agree that our records will be
                  the final authority in determining the terms and circumstances
                  of your participation in the instant win games available on
                  the Website.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>7.</span>
                <span>Termination</span>
              </h4>
              <p className="p_para">
                <span>7.1</span>
                <span>
                  We reserve the right at our absolute discretion, and without
                  any obligation to provide you with a reason, to immediately
                  terminate these Terms and Conditions and/or withhold your
                  Player Account balance and/or suspend your Player Account
                  and/or close your Player Account and/or recover from your
                  Player Account the amount of any affected pay-outs, bonuses
                  and winnings. Examples of situations where we may take any of
                  the above actions include, but are not limited to, where:
                </span>
              </p>
              <p className="p_para">
                <span>7.1.1</span>
                <span>
                  you are in breach of an important provision of these Terms and
                  Conditions;
                </span>
              </p>
              <p className="p_para">
                <span>7.1.2</span>
                <span>
                  we become aware that you have used or attempted to use the
                  Website and/or the Services for the purposes of fraud,
                  collusion or unlawful or improper activity;
                </span>
              </p>
              <p className="p_para">
                <span>7.1.3</span>
                <span>
                  we become aware through an official source that you have
                  played at any other online gambling site or services and, in
                  connection with the same, are suspected of fraud, collusion
                  (including in relation to charge-backs) or unlawful or
                  improper activity;
                </span>
              </p>
              <p className="p_para">
                <span>7.1.4</span>
                <span>
                  you become bankrupt, do not make payment of a court judgment
                  on time, make an arrangement with your creditors or any of
                  your assets are the subject of any form of seizure, or
                  analogous proceedings are brought in relation to you anywhere
                  in the world; or
                </span>
              </p>
              <p className="p_para">
                <span>7.1.5</span>
                <span>
                  If the Direct Debit instruction lodged with your nominate bank
                  is rejected for whatever reason or is no longer valid
                </span>
              </p>
              <p className="p_para">
                <span>7.2</span>
                <span>
                  Subject to paragraph 7.4 below, you are entitled at any time
                  to close your Player Account and terminate these Terms and
                  Conditions on notice to us by email, telephone or post using
                  the details on the Website. We will respond within a
                  reasonable time. You remain responsible for activities using
                  your Player Account until it is closed. You will be required
                  to withdraw any outstanding balance in your Player Account (if
                  any) on termination of these Terms and Conditions.
                </span>
              </p>
              <p className="p_para">
                <span>7.3</span>
                <span>
                  Subject to paragraph 7.4 below, we are entitled to close your
                  Player Account and terminate these Terms and Conditions by
                  giving notice to the email address you notified to us in
                  relation to your Player Account and, following such notice,
                  you will no longer be able to access the Services other than
                  to withdraw any outstanding balances in your Player Account
                  (if applicable).
                </span>
              </p>
              <p className="p_para">
                <span>7.4</span>
                <span>
                  With the exception of termination in accordance with paragraph
                  7.1 above, termination shall be effective from the date on
                  which all outstanding bets made by you via your Player Account
                  as at the date on which notice to close your Player Account
                  was sent are settled and such notice of termination of these
                  Terms and Conditions will not affect any outstanding bets
                  provided they are valid and not in breach of these Terms and
                  Conditions.
                </span>
              </p>
            </div>
            <div className="mb-5">
              <h4 className="t_title">
                <span>8.</span>
                <span>Your use of the Website</span>
              </h4>
              <p className="p_para">
                <span>8.1</span>
                <span>
                  We reserve the right to suspend, modify, remove and/or add to
                  the Services and/or to the Website at our sole discretion with
                  immediate effect and without notice.
                </span>
              </p>
            </div>
            {!hasAcceptTerms && (
              <div className="mb-5">
                <div className="mt-5">
                  <div className="checkboxDiv">
                    <div
                      className="form-check"
                      style={{ fontSize: 13, fontStyle: "italic" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => setAcceptTerms(!acceptTerms)}
                        value={acceptTerms}
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I have read and agree Terms and conditions and confirm
                        that I am at least 18 years old.
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-5 text-center d-block"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {/* <button className="grandLottoButton button-outline-light">
                  Sign In
                </button> */}
                  <button
                    className="grandLottoButton"
                    disabled={!acceptTerms}
                    onClick={() => handlecceptedTerms()}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
