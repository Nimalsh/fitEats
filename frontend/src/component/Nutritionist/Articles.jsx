import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Articlecard } from './Articlecard';
import Newarticleform from './Newarticleform';

function Articles() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const articles = [
    {
      image: 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=2048x2048&w=is&k=20&c=rRlOrFqCQn8kBDwvZnN75XFxiD0CA6S2LkgVKQRYJ3k=',
      title: 'Fast Food',
      description: 'Effects of a cafeteria-based sustainable diet intervention on the adherence to the EAT-Lancet planetary health diet and greenhouse gas emissions of consumers...',
      location: 'Mumbai',
      datePublished: 'February 14, 2024 12:00 AM',
      dateUpdated: 'February 14, 2024 12:00 AM',
      showDelete: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2023/06/29/07/44/ai-generated-8095874_640.png',
      title: 'The Impact of Protein Supplements',
      description: 'An overview of the benefits and risks associated with the consumption of protein supplements among athletes and bodybuilders...',
      location: 'New York',
      datePublished: 'March 10, 2024 08:30 AM',
      dateUpdated: 'March 11, 2024 09:00 AM',
      showDelete: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2024/05/23/00/44/almonds-8781985_640.png',
      title: 'The Rise of the Keto Diet',
      description: 'Exploring the popularity of the ketogenic diet, its health benefits, and potential risks for long-term health...',
      location: 'Los Angeles',
      datePublished: 'April 22, 2024 10:15 AM',
      dateUpdated: 'April 23, 2024 11:00 AM',
      showDelete: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2024/04/20/01/23/generated-to-8707537_640.png',
      title: 'Plant-Based Diets and Sustainability',
      description: 'A look into how plant-based diets can contribute to environmental sustainability and personal health...',
      location: 'London',
      datePublished: 'May 5, 2024 01:00 PM',
      dateUpdated: 'May 6, 2024 02:30 PM',
      showDelete: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2019/12/12/15/40/diet-4691012_1280.png',
      title: 'Intermittent Fasting: Pros and Cons',
      description: 'Examining the health effects of intermittent fasting, including its benefits for weight loss and metabolic health...',
      location: 'Sydney',
      datePublished: 'June 15, 2024 09:00 AM',
      dateUpdated: 'June 16, 2024 10:30 AM',
      showDelete: true,
    },
    {
      image: 'https://cdn.pixabay.com/photo/2023/06/02/22/10/ai-generated-8036516_1280.png',
      title: 'The Cultural Significance of Indian Cuisine',
      description: 'Exploring the diverse flavors and rich cultural heritage of Indian cuisine, from regional specialties to festive foods...',
      location: 'Delhi',
      datePublished: 'July 1, 2024 07:45 AM',
      dateUpdated: 'July 2, 2024 08:00 AM',
      showDelete: true,
    },
  
  ];
  

  return (
    <Box className="mt-5 px-5">
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Articles" />
        <Tab label="New Article" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <div className="flex flex-wrap gap-5">
          {articles.map((article, index) => (
            <Articlecard key={index} {...article} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Box sx={{ mt: 2 }}>
          <Newarticleform />
        </Box>
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Articles;
