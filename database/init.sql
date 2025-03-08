CREATE TABLE campaigns_topics (
  id serial PRIMARY KEY,
  vertical varchar(255) NOT NULL,
  sub_vertical varchar(255) NOT NULL,
  topic varchar(255) NOT NULL,
  geo varchar(255) NOT NULL, 
  platform varchar(255) NOT NULL,
  clicks int DEFAULT 0 NOT NULL
);

INSERT INTO campaigns_topics (vertical, sub_vertical, topic, geo, platform, clicks)
VALUES
    ('Fashion', 'sustainable fashion', 'Promoting eco-friendly and sustainable fashion brands with behind-the-scenes content', 'United States', 'TikTok', 21),
    ('Food & Beverage', 'vegan lifestyle', 'Engage with vegan influencers to create recipe challenges', 'United States', 'Facebook', 311),
    ('Technology', 'smart home devices', 'Highlight the benefits of smart home devices in improving energy efficiency', 'Canada', 'Facebook', 504),
    ('Health & Wellness', 'mental health awareness', 'Share personal mental health journeys to destigmatize mental health talks', 'Australia', 'TikTok', 3),
    ('Travel', 'adventure travel', 'Showcase off-the-beaten-path travel destinations with immersive video experiences', 'Canada', 'Facebook', 98),
    ('Fashion', 'streetwear', 'Organize a street style lookbook contest with user-generated content', 'United States', 'TikTok', 101),
    ('Food & Beverage', 'craft beverages', 'Spotlight on local craft breweries and unique beer-making processes', 'Canada', 'Facebook', 987),
    ('Fitness', 'home workouts', 'At-home workout challenge series with popular fitness influencers', 'United Kingdom', 'TikTok', 762),
    ('Technology', 'gaming', 'Create a gaming tournament for indie games featuring rising streamers', 'Mexico', 'Facebook', 345),
    ('Education', 'online learning', 'Highlight innovative online courses for skill development with student testimonials', 'Mexico', 'TikTok', 324);
