# Map Visualization of UNICEF Digital Public Goods


This project was created to visualize digital public good developments and implementations in various countries.

Digital Public Goods (DPGs) are defined as “open source software, open data, open AI models, open standards, and open content that adhere to privacy and other applicable best practices, do no harm and are of high relevance for attaining the UN’s 2030 Sustainable Development Goals (SDGs)”.

The goal of this project is to build a map visualization of multiple dimensions of data related to the geographic extent of digital public goods. The multiple dimensions come from aspects like:

1) countries in which a good was developed
2) countries where the good has been implemented


## Configuration

In order to run this application, you need to open an account with [Mapbox](https://www.mapbox.com/) to obtain an *Access Token*. The following [environment variable](https://nextjs.org/docs/basic-features/environment-variables) need to be set in `.env` or `.env.local`:
```
NEXT_PUBLIC_ACCESS_TOKEN="MAPBOX_ACCESS_TOKEN"
```

## Development Environment

Setup your development environment as follows:

1. Clone this repo:
    - SSL:
    ```bash
    git clone git@github.com:vaishnavi-ch/DPG.git
    ```
    - HTTPS:
    ```bash
    git clone https://github.com/vaishnavi-ch/DPG.git
    ```
2. Install project dependencies:
    ```bash
    cd DPG
    npm install
    ```
3. After having set up the proper [Configuration](#%EF%B8%8F-configuration), run the developmnet server with [fast refresh](https://nextjs.org/docs/basic-features/fast-refresh):
    ```bash
    npm run dev
    ```
## Output

1) Chloropeth Map to visualize which country has developed the most DPGs

![Screenshot (1181)](https://user-images.githubusercontent.com/66664653/130783195-dd3341f1-fa5a-4627-b09f-6eb6570d6e89.png)

2) Chloropeth Map to visualize which country has highest number DPGs deployed

![Screenshot (1182)](https://user-images.githubusercontent.com/66664653/130783199-2c39a4c9-4317-4c5f-8a7b-5a203f5fa538.png)

3) Search by DPG

![Screenshot (1183)](https://user-images.githubusercontent.com/66664653/130783204-38997bbc-e476-4b58-a938-d71fb506833a.png)
![Screenshot (1184)](https://user-images.githubusercontent.com/66664653/130783207-c3547397-7cf2-41a1-a161-212037a40f4b.png)
