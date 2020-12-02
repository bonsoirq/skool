import React, { Component } from 'react';
import { AdmissionCardAggregate } from '../aggregates/admission-card-aggregate';
import { AdmissionCard } from '../entities/admission-card';
import { AdmissionCardAggregatesRepo } from '../repos/admission-card-aggregates-repo';
import { AdmissionCardsRepo } from '../repos/admission-cards-repo';
import { map } from '../util/promise';
import { AdmissionCardsTable } from './AdmissionCardsTable';
import { AppContext } from './AppContext';
import { NewAdmissionCard } from './NewAdmissionCard';

interface IState {
  aggregates: AdmissionCardAggregate[],
}
export class AdmissionCardsContainer extends Component<any, IState> {
  static contextType = AppContext
  private _repository = new AdmissionCardsRepo(this.context.connection)
  private _aggregateRepository = new AdmissionCardAggregatesRepo(this.context.connection)

  state: IState = {
    aggregates: []
  }
  componentDidMount () {
    this.fetchAdmissionCards()
  }
  async addAdmissionCard (admissionCard: AdmissionCard) {
    await this._repository.add(admissionCard)
    this.fetchAdmissionCards()
  }

  async fetchAdmissionCards () {
    const admissionCards = await this._repository.find()
    const aggregates = await map(admissionCards, async (x) => await this._aggregateRepository.findByNumber(x.number)) as AdmissionCardAggregate[]
    this.setState(() => ({ aggregates }))
  }

  render() {
    const { aggregates } = this.state
    return (
      <>
        <NewAdmissionCard onCreate={x => this.addAdmissionCard(x)} />
        <AdmissionCardsTable
          admissionCardAggregates={aggregates}
        />
      </>
    );
  }
}
