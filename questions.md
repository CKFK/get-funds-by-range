1. How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
# Answer 

# 2 Day

# I want to make my data display graph. Because it will allow the user to choose to view the display in the desired format in many formats.
# If I don't have much time I will write my code as thoroughly as possible to prevent any bugs.

2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
# Answer I chosen javascript laguage, 

axios.get('https://fund-ranking-api.herokuapp.com/getRanking').then((res) => {
    const data = res.data ? res.data.data : []
    setFundRankingList(data)
    setFundRankingListForOrder(fundRankingListForOrder)
})

const newFundRankingList = fundRankingList && fundRankingList.filter(item => {
    let nav_date = new Date(item.nav_date);
    return nav_date >= startDate && nav_date <= endDate 
}).sort((a,b) => {
    return b.nav_return - a.nav_return
});

# I get data from FINNOMENA APIs and I filter data by start date and end date with nav_date (update date). and step two i sort data Descending from fund performance

3. How would you track down a performance issue in production? Have you ever had to do this?
# Answer Find the log and fix it and find a way to make the system as efficient as possible., No because most of senior web develop will do this part.

4. How would you improve the FINNOMENA APIs that you just used?
# Answer I will improve it by using the problem you provided, convert to sql script for Query to return data from API so that you don't have to manage data again from client side.
