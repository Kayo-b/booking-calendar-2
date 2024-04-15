import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import WeekView from '@/components/WeekView.vue';
import { weekDaysMock } from './utils/weekDaysMock';

interface DayInfo {
    day: Date;
    pickupArray: any[];
    dropoffArray: any[];
}

describe('WeekView', () => {
    it('renders the correct number of days', () => {
        const wrapper = shallowMount(WeekView, {
            propsData: {
                startDate: new Date(),
                selectedStationBookings: []
            } as { startDate: Date; selectedStationBookings: any[] }
        });

        const days = wrapper.findAll('.day');
        expect(days.length).toBe(7);
    });

    it('renders the correct day names', async () => {
        let startDate = new Date();
        // Set week to start on monday.
        const dayOfWeek = startDate.getDay();
        const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate.setDate(diff);

        const wrapper = mount(WeekView, {
            propsData: {
                startDate: startDate,
                selectedStationBookings: [],
            } as { startDate: Date; selectedStationBookings: any[] },
        });
        const expectedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const daysDisplayed = wrapper.findAll('.day-name');

        // Checks if weekDays returns the expected order of weekdays
        const computedWeekdays: DayInfo[] = wrapper.vm.weekDays;
        computedWeekdays.forEach((dayInfo, index) => {
            const dayName = dayInfo.day.toLocaleDateString('en-US', { weekday: 'long' });
            expect(dayName).toBe(expectedDays[index])
        })

        // Checks if weekdays text is being displayed 
        daysDisplayed.forEach((dayWrapper, index) => {
            expect(dayWrapper.text()).toBe(expectedDays[index]);
        });

    });

    it('Displays pickup/return bookings', () => {
        let startDate = new Date();
        const wrapper = mount(WeekView, {
            computed: {
                weekDays: () => weekDaysMock
            },
            propsData: {
                startDate: startDate,
                selectedStationBookings: [],
            } as { startDate: Date; selectedStationBookings: any[] }
        });

        //Check if "Pickup" is visible
        const pickupElement = wrapper.findAll('.booking-pickup');
        expect(pickupElement.length).toBe(2)
        pickupElement.forEach((pickup, index) => {
            expect(pickup.text()).toBe('Pickup')
        })

        // Check if "Return" is visible
        const dropoffElement = wrapper.findAll('.booking-dropoff');
        expect(pickupElement.length).toBe(2)
        dropoffElement.forEach((dropoff, index) => {
            expect
            expect(dropoff.text()).toBe('Return')
        })
    });
    it("Click Pickup/Return elements and check for event trigger", () => {
        let startDate = new Date();
        const wrapper = mount(WeekView, {
            computed: {
                weekDays: () => weekDaysMock
            },
            propsData: {
                startDate: startDate,
                selectedStationBookings: [],
            } as { startDate: Date; selectedStationBookings: any[] }
        });

        // Check if pickup details event was triggered and if its values are correct    
        const pickup = wrapper.find('.booking-pickup');
        pickup.trigger('click');

        const eventPayload = wrapper.emitted('booking-details')

        const pickupBookingData = weekDaysMock[0].pickupArray[0]

        expect(wrapper.emitted('booking-details')).toBeTruthy();
        if (eventPayload) expect(eventPayload[0][0]).toEqual(pickupBookingData);

        // Check ip dropoff-details event was triggered and if its values are correct
        const dropoff = wrapper.find('.booking-dropoff');
        dropoff.trigger('click');

        const dropoffBookingData = weekDaysMock[1].dropoffArray[0];
        if (eventPayload) expect(eventPayload[1][0]).toEqual(dropoffBookingData)

    })
});