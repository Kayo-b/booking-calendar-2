# vue-project
Booking Agenda interface displaying the pickups and returns provided by the mock API.

## Details

The weekly agenda interface is powered by the main Vue.app component, which handles part of the necessary logic, such as setting the order of days, fetching data from the API, and moving the dates forward or backward.
From Vue.app, there are three more child components that manage different parts of the application: WeekView, RentalStationSelector, and BookingDetailView.

**WeekView**: responsible for converting the currentDate from the parent component into an array that holds a specific date and, if there are any "bookings" (`pickups` or `returns`/`dropoffs`) on this date, it stores the booking details data for that day. 

**RentalStationSelector**: receives the stations object from the parent component and handles the logic of the station selection dropdown menu, returning (`$emit`) the stationId and station name back to the parent component. 

**BookingDetailView**: eceives the booking details data from the parent component and displays it in a simple grid layout.

### Unit Testing

There are two files for unit tests. The more extensive one is the WeekView.spec.ts file, where the weekly calendar and its bookings are checked to ensure the rendered information is correct and, in the case of the bookings, when clicked, if the trigger is emitting the correct booking details data.

The second test file is App.spec.ts, where the station selection dropdown menu's rendered content and the dates next to the week navigation arrow icons are verified for their rendered data. This test file requires further improvements; it still needs to test the functionality of the week navigation buttons as well as whether the dates will dynamically change as expected.

For these tests I used mock data for the weekDays array and for the stations+booking data that is fetched from the provided API.

