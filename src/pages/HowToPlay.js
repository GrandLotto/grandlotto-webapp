import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { bodyScrollTop } from "../global/customFunctions";

const HowToPlay = () => {
  let location = useLocation();

  useLayoutEffect(() => {
    bodyScrollTop();
  }, [location]);

  return (
    <div className="oauthHasWeight hasPlayys">
      <div className="row">
        <div className="col-md-11 mx-auto ">
          <div className="mt-2">
            <div className="grandlotto_tabs text-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#howToPlay-tab"
                  >
                    How to play
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#whatcanIWin-tab"
                  >
                    What can I win
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#drawAndGameTypes-tab"
                  >
                    Draw and Game Types
                  </a>
                </li> */}
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="howToPlay-tab">
                <div className="oauthHasWeightCol ">
                  <div className="mb-5">
                    <h4 className="t_Style_title">
                      <span>1</span>
                      <span>
                        Choose a draw to play in (all draws are the same format,
                        just at different times)
                      </span>
                    </h4>
                    <h4 className="t_Style_title">
                      <span>2</span>
                      <span>Select atleast 3 numbers between 1-90</span>
                    </h4>
                    <h4 className="t_Style_title">
                      <span>3</span>
                      <span>
                        Set how much to pay for your ticket (min. N50 and max.
                        N50,000)
                      </span>
                    </h4>
                    <h4 className="t_Style_title">
                      <span>4</span>
                      <span>
                        Note that all games with amount above 22,500 the odds
                        are made dynamic
                      </span>
                    </h4>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-center">Perm Games</h3>
                    <p className="text-center">
                      As well as PERM 2, there are other PERM tickets that
                      follow the same structure. A customer selects their
                      numbers and sets how much they will pay (min. N50 & max.
                      N50,000). They win if their numbers are drawn out. This
                      tables shows a breakdown of the types and what can be won:
                    </p>

                    <div className="mt-5">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Ticket Name</th>
                              <th>Numbers Selected</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>PERM 2</td>
                              <td>
                                Select from 2 to 15 numbers from 90 numbers
                              </td>
                            </tr>
                            <tr>
                              <td>PERM 3</td>
                              <td>
                                Select from 3 to 15 numbers from 90 numbers
                              </td>
                            </tr>
                            <tr>
                              <td>PERM 4</td>
                              <td>
                                Select from 4 to 15 numbers from 90 numbers
                              </td>
                            </tr>
                            <tr>
                              <td>PERM 5</td>
                              <td>
                                Select from 5 to 15 numbers from 90 numbers
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-center">Nap Games</h3>
                    <p className="text-center">
                      A customer selects their numbers and sets how much they
                      will pay (min. N50 & max. N50,000). They win if their
                      numbers are drawn out. This tables shows a breakdown of
                      the types and what can be won:
                    </p>

                    <div className="mt-5">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Ticket Name</th>
                              <th>Numbers Selected</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>NAP 1</td>
                              <td>Select a single numbers from 90 numbers</td>
                            </tr>
                            <tr>
                              <td>NAP 2</td>
                              <td>Select 2 numbers from 90 numbers</td>
                            </tr>
                            <tr>
                              <td>NAP 3</td>
                              <td>Select 3 numbers from 90 numbers</td>
                            </tr>
                            <tr>
                              <td>NAP 4</td>
                              <td>Select 4 numbers from 90 numbers</td>
                            </tr>
                            <tr>
                              <td>NAP 5</td>
                              <td>Select 5 numbers from 90 numbers</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-center">1 BANKER</h3>
                    <p className="text-center">
                      This is similar to NAP 1, you only pick a single number
                      but thw winning odd and pattern is different
                    </p>

                    <div className="mt-5">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Ticket Name</th>
                              <th>Numbers Selected</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1 BANKER</td>
                              <td>Select a single numbers from 90 numbers</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-center">AGAINST</h3>
                    <p className="text-center">
                      Against games are played choosing a set of numbers against
                      another set of numbers.
                    </p>

                    <div className="mt-5">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Ticket Name</th>
                              <th>Numbers Selected</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>AGAINST </td>
                              <td>
                                Select a set of numbers from 90 numbers, against
                                another set of numbers from the remaining
                                numbers
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="whatcanIWin-tab">
                <div className="oauthHasWeightCol ">
                  <div className="mb-5">
                    <p className="mb-5">
                      <b>
                        Once you have bought your ticket you can sit back and
                        relax and wait to see if you are a winner:
                      </b>
                    </p>
                    <h4 className="t_Style_title">
                      <span>1</span>
                      <span>
                        The draws take place in Lagos where 5 numbers from 1-90
                        will be selected at random.
                      </span>
                    </h4>
                    <h4 className="t_Style_title">
                      <span>2</span>
                      <span>
                        If your numbers are drawn you will win the odd of the
                        game you played multiplied by a amount depending on the
                        type of game you played.
                      </span>
                    </h4>

                    <p className="mt-5">
                      So, for example, if you buy a N100 ticket on a NAP 2 game
                      and your numbers come out you will win N24,000.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="drawAndGameTypes-tab"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
