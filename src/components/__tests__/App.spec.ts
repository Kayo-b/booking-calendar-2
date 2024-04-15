import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import { weekDaysMock } from './utils/weekDaysMock';
import { stationsMock } from './utils/stationsMock';
import App from '@/App.vue';

describe('App', () => {
  it('renders the main container', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.find('.main-container').exists()).toBe(true);
  });

  it('renders the header container', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.find('.header-container').exists()).toBe(true);
  });

  it('clicks on station-select options and checks if stations names are correct', () => {
    let startDate = new Date();
    const cities = ['Berlin', 'Munich', 'Frankfurt', 'Lisbon', 'Barcelona', 'Lyon'];
    const wrapper = mount(App, {
      data() {
        return {
          weekDays: weekDaysMock,
          stations: stationsMock
        }
      },
      propsData: {
        startDate: startDate,
        selectedStationBookings: [],

      } as { startDate: Date; selectedStationBookings: any[] }
    });
    const dropdownMenu = wrapper.find('.station-selection')
    expect(dropdownMenu).toBeTruthy()

    const dropdownMenuItems = wrapper.findAll('option')

    dropdownMenuItems.forEach((item, index) => {
      item.trigger('click')
      expect(item.text()).toBe(cities[index])
    })
  })

  it('dates are being displayed next to arrow keys', () => {
    let startDate = new Date();
    const wrapper = mount(App, {
      data() {
        return {
          weekDays: weekDaysMock,
          stations: stationsMock
        }
      },
      propsData: {
        startDate: startDate,
        selectedStationBookings: [],

      } as { startDate: Date; selectedStationBookings: any[] }
    });

    const dateDisplay1 = wrapper.find('.date-1')
    expect(dateDisplay1.text()).toBe('16.4.2024')

  })

});