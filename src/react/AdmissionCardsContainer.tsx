import React, { Component } from 'react';
import { AdmissionCard } from '../entities/admission-card';
import { AdmissionCardsViewRow } from '../generated/row-types';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';
import { AdmissionCardsTable } from './AdmissionCardsTable';
import { AppContext } from './AppContext';
import { NewAdmissionCard } from './NewAdmissionCard';

interface IState {
  viewRows: AdmissionCardsViewRow[],
}
export class AdmissionCardsContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new AdmissionCardsRepo(this.context.connection)

  state: IState = {
    viewRows: []
  }
  componentDidMount () {
    this.fetchAdmissionCards()
  }
  async addAdmissionCard (admissionCard: AdmissionCard) {
    await this._repository.add(admissionCard)
    this.fetchAdmissionCards()
  }

  async fetchAdmissionCards () {
    this._repository.findView()
      .then(viewRows => this.setState(() => ({ viewRows })))
  }

  render() {
    const { viewRows } = this.state
    return (
      <>
        <NewAdmissionCard onCreate={x => this.addAdmissionCard(x)} />
        <AdmissionCardsTable
          viewRows={viewRows}
        />
      </>
    );
  }
}
