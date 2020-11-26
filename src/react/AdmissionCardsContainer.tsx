import React, { Component } from 'react';
import { AdmissionCard } from '../entities/admission-card';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';
import { AdmissionCardsTable } from './AdmissionCardsTable';
import { AppContext } from './AppContext';
import { NewAdmissionCard } from './NewAdmissionCard';

interface IState {
  admissionCards: AdmissionCard[],
}
export class AdmissionCardsContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new AdmissionCardsRepo(this.context.connection)

  state: IState = {
    admissionCards: []
  }
  componentDidMount () {
    this.fetchAdmissionCards()
  }
  async addAdmissionCard (admissionCard: AdmissionCard) {
    await this._repository.add(admissionCard)
    this.fetchAdmissionCards()
  }

  fetchAdmissionCards () {
    this._repository.all()
      .then(admissionCards => this.setState(() => ({ admissionCards })))
  }

  render() {
    const { admissionCards } = this.state
    return (
      <>
        <NewAdmissionCard onCreate={x => this.addAdmissionCard(x)} />
        <AdmissionCardsTable
          admissionCards={admissionCards}
        />
      </>
    );
  }
}
