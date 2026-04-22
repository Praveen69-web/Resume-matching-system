/**
 * ═══════════════════════════════════════════════════════
 *  DATA — data.js
 *  Industry-level job database & student profiles
 * ═══════════════════════════════════════════════════════
 */  
// ─── JOB DATABASE ────────────────────────────────────────────────────────────
const JOB_DATABASE = [
  {
    id: 'j01', title: 'Machine Learning Engineer',
    category: 'AI / ML',
    text: `Machine learning engineer with expertise in Python, TensorFlow, PyTorch, scikit-learn.
           Build and deploy deep learning models including convolutional neural networks CNN and
           recurrent neural networks RNN for production systems. Experience with model optimization,
           hyperparameter tuning, MLOps pipelines, Docker, Kubernetes. Understanding of statistics,
           linear algebra, gradient descent, backpropagation. AWS SageMaker or Google Vertex AI.`,
    keywords: ['python','tensorflow','pytorch','scikit-learn','deep learning','neural networks','mlops']
  },
  {
    id: 'j02', title: 'Data Scientist',
    category: 'Data',
    text: `Data scientist skilled in Python, R, statistical modeling, machine learning, and data analysis.
           Experience with pandas, NumPy, matplotlib, seaborn, Tableau, Power BI for data visualization.
           Strong knowledge of regression, classification, clustering, time series forecasting.
           SQL database querying, A/B testing, hypothesis testing, experimental design. Big data tools
           like Spark, Hadoop. Communication of insights to non-technical stakeholders.`,
    keywords: ['python','r','statistics','pandas','machine learning','visualization','sql']
  },
  {
    id: 'j03', title: 'Data Analyst',
    category: 'Data',
    text: `Data analyst with strong skills in SQL, Excel, Power BI, Tableau for business intelligence
           and reporting. Experience in data cleaning, data wrangling, exploratory data analysis EDA.
           Python or R for scripting and automation. KPI tracking, dashboard creation, business metrics.
           Understanding of relational databases, ETL pipelines. Ability to translate data into
           actionable business insights. Google Analytics, Looker, or similar tools preferred.`,
    keywords: ['sql','excel','power bi','tableau','data analysis','reporting','dashboards']
  },
  {
    id: 'j04', title: 'Full Stack Web Developer',
    category: 'Web Dev',
    text: `Full stack developer proficient in JavaScript, TypeScript, React, Node.js, Express.
           Frontend development with HTML5, CSS3, responsive design. Backend REST APIs, GraphQL.
           Database management with PostgreSQL, MongoDB, Redis. Version control with Git, GitHub.
           Cloud deployment on AWS, Azure, or Google Cloud. Docker containers, CI/CD pipelines.
           Understanding of web security, authentication, OAuth, JWT tokens.`,
    keywords: ['javascript','react','node.js','html','css','sql','git','docker']
  },
  {
    id: 'j05', title: 'DevOps / Cloud Engineer',
    category: 'Cloud',
    text: `DevOps engineer with expertise in AWS, Azure, or Google Cloud Platform GCP. Infrastructure
           as code using Terraform, Ansible, CloudFormation. Container orchestration with Kubernetes,
           Docker. CI/CD pipeline implementation with Jenkins, GitHub Actions, GitLab CI.
           Monitoring and logging with Prometheus, Grafana, ELK stack. Shell scripting bash Python.
           Network configuration, VPC, load balancing, auto-scaling. Linux system administration.`,
    keywords: ['aws','kubernetes','docker','terraform','jenkins','linux','devops','cloud']
  },
  {
    id: 'j06', title: 'Natural Language Processing Engineer',
    category: 'AI / ML',
    text: `NLP engineer with deep knowledge of text processing, tokenization, named entity recognition NER,
           sentiment analysis, text classification, machine translation. Experience with transformers BERT
           GPT RoBERTa, HuggingFace Transformers library. Word embeddings word2vec GloVe fastText.
           SpaCy NLTK for text processing pipelines. Python TensorFlow PyTorch. Large language models LLM
           fine-tuning, prompt engineering, RAG retrieval augmented generation.`,
    keywords: ['nlp','bert','transformers','spacy','nltk','python','text processing','huggingface']
  },
  {
    id: 'j07', title: 'Computer Vision Engineer',
    category: 'AI / ML',
    text: `Computer vision engineer specializing in image processing, object detection, image segmentation,
           facial recognition, OCR optical character recognition. Deep learning frameworks TensorFlow
           PyTorch OpenCV. Convolutional neural networks ResNet VGG YOLO EfficientNet.
           Video analytics, real-time inference, edge deployment. Python, C++ for performance critical
           applications. Dataset annotation, data augmentation techniques.`,
    keywords: ['computer vision','opencv','yolo','pytorch','image processing','deep learning','tensorflow']
  },
  {
    id: 'j08', title: 'Cybersecurity Analyst',
    category: 'Security',
    text: `Cybersecurity analyst with knowledge of network security, penetration testing, vulnerability
           assessment, ethical hacking. Familiarity with OWASP top ten, SIEM tools, firewall configuration.
           Experience with Kali Linux, Metasploit, Wireshark, Burp Suite. Incident response, digital
           forensics, threat intelligence. Security certifications CEH CISSP CompTIA Security+.
           Python scripting for security automation. Cloud security AWS GCP Azure.`,
    keywords: ['cybersecurity','penetration testing','kali linux','network security','python','siem','ethical hacking']
  },
  {
    id: 'j09', title: 'Android / iOS Mobile Developer',
    category: 'Mobile',
    text: `Mobile developer skilled in Android development using Kotlin Java and iOS development using
           Swift SwiftUI. Cross-platform development with Flutter Dart or React Native JavaScript.
           RESTful API integration, Firebase, local databases Room SQLite CoreData. App Store Google Play
           deployment, push notifications, in-app purchases. UI/UX principles for mobile, material design,
           human interface guidelines. Git version control, Agile Scrum methodology.`,
    keywords: ['android','kotlin','ios','swift','flutter','react native','mobile development','firebase']
  },
  {
    id: 'j10', title: 'Business Intelligence Developer',
    category: 'Data',
    text: `Business intelligence developer with expertise in data warehousing, dimensional modeling,
           ETL development, OLAP. Proficient in SQL Server, Snowflake, Redshift, BigQuery.
           Dashboard and report development in Power BI Tableau Qlik. MDX DAX queries.
           Data pipeline development, stored procedures, performance optimization.
           Understanding of business processes, KPI definition, stakeholder reporting.`,
    keywords: ['power bi','tableau','sql','data warehouse','etl','business intelligence','snowflake']
  },
  {
    id: 'j11', title: 'Blockchain / Web3 Developer',
    category: 'Blockchain',
    text: `Blockchain developer with experience in Ethereum Solidity smart contracts, decentralized
           applications dApps, Web3.js ethers.js. Understanding of DeFi protocols, NFT standards ERC-721
           ERC-1155, consensus mechanisms proof of work proof of stake. Hardhat Truffle Foundry for
           development testing. IPFS decentralized storage. Rust for Solana blockchain.
           Cryptography, hash functions, digital signatures.`,
    keywords: ['blockchain','solidity','ethereum','smart contracts','web3','defi','rust']
  },
  {
    id: 'j12', title: 'UI/UX Designer',
    category: 'Design',
    text: `UI UX designer with expertise in user research, wireframing, prototyping, usability testing.
           Proficient in Figma Adobe XD Sketch. Understanding of design systems, accessibility WCAG,
           responsive design, interaction design. HTML CSS JavaScript basics for designer-developer
           collaboration. Mobile app design, component libraries, typography, color theory.
           User journey mapping, information architecture, A/B testing for design decisions.`,
    keywords: ['figma','ui design','ux','wireframing','prototyping','user research','adobe xd','design systems']
  },
  {
    id: 'j13', title: 'Data Engineer',
    category: 'Data',
    text: `Data engineer with expertise in building scalable data pipelines, ETL ELT workflows.
           Proficient in Apache Spark, Apache Kafka, Apache Airflow for workflow orchestration.
           Cloud data platforms AWS Glue Redshift BigQuery Databricks Snowflake.
           Python SQL for data transformation. Streaming data processing, batch processing.
           Data modeling, schema design, data governance, data quality frameworks.
           Docker Kubernetes for pipeline deployment.`,
    keywords: ['data engineering','spark','kafka','airflow','python','sql','etl','databricks']
  },
  {
    id: 'j14', title: 'Software Test Engineer (QA)',
    category: 'QA',
    text: `QA engineer with expertise in manual and automated testing. Selenium WebDriver Playwright
           Cypress for web automation. API testing with Postman REST Assured. Performance testing
           JMeter Gatling. Test management tools Jira TestRail Zephyr. Python Java for test scripts.
           Agile Scrum methodology, test-driven development TDD, continuous integration testing.
           Mobile testing, cross-browser compatibility, regression testing.`,
    keywords: ['selenium','automation testing','python','java','api testing','cypress','jira','qa']
  },
  {
    id: 'j15', title: 'Research Scientist (AI)',
    category: 'Research',
    text: `AI research scientist with strong background in mathematics, statistics, linear algebra.
           Experience in publishing research papers, implementing state-of-the-art models.
           Deep learning optimization techniques, reinforcement learning, generative AI models GANs
           diffusion models VAEs. PyTorch TensorFlow for research experiments. Familiarity with
           arXiv literature, academic conferences NeurIPS ICML ICLR. PhD preferred.
           Python C++ CUDA for GPU programming.`,
    keywords: ['research','deep learning','reinforcement learning','pytorch','mathematics','generative ai','cuda']
  }
];

// ─── STUDENT DATABASE ─────────────────────────────────────────────────────────
const STUDENT_DATABASE = [
  {
    id: 's01', name: 'Aarav Sharma',
    text: `Proficient in Python machine learning scikit-learn TensorFlow data analysis pandas NumPy.
           Projects: house price prediction using regression, image classifier using CNN TensorFlow.
           Internship at AI startup building recommendation systems. Good understanding of statistics
           and probability. Participated in Kaggle competitions. Knowledge of SQL and data visualization
           with matplotlib seaborn. Final year B.Tech Computer Science.`
  },
  {
    id: 's02', name: 'Priya Reddy',
    text: `Expert in SQL Power BI Tableau Excel data analysis business intelligence reporting dashboards.
           Completed certification in Google Data Analytics. Built sales analytics dashboard for college
           ERP system. Knowledge of Python pandas for data cleaning automation. Experience in data
           warehousing concepts ETL. Strong statistical analysis skills hypothesis testing regression.
           MBA Business Analytics student with internship in business data reporting.`
  },
  {
    id: 's03', name: 'Rohit Verma',
    text: `Full stack developer skilled in JavaScript React Node.js Express MongoDB PostgreSQL.
           Built multiple web applications deployed on AWS EC2 S3. Knowledge of Docker containers
           Git GitHub REST APIs. Understanding of HTML CSS responsive design. Familiar with
           TypeScript and GraphQL. Completed internship at product startup building customer portal.
           B.Tech Computer Science third year.`
  },
  {
    id: 's04', name: 'Sneha Iyer',
    text: `Android developer with expertise in Kotlin Java Android SDK Firebase. Built 3 published
           Android apps on Google Play Store. Knowledge of Flutter for cross-platform development.
           REST API integration, Room database, MVVM architecture. Familiar with iOS Swift basics.
           React Native JavaScript for hybrid development. Mobile UI design material design principles.
           Internship at mobile app company. B.Tech student passionate about mobile development.`
  },
  {
    id: 's05', name: 'Arjun Nair',
    text: `Cybersecurity enthusiast with knowledge of network security penetration testing ethical hacking.
           Certified in CompTIA Security+ CEH beginner level. Familiar with Kali Linux Metasploit
           Wireshark Nmap Burp Suite tools. Python scripting for security automation port scanning.
           CTF Capture The Flag competitions participant. OWASP vulnerability awareness. College
           cybersecurity club president. B.Tech Information Security.`
  },
  {
    id: 's06', name: 'Divya Menon',
    text: `NLP and text analytics enthusiast with Python NLTK SpaCy HuggingFace Transformers BERT.
           Research project on sentiment analysis of social media data. Familiar with word embeddings
           word2vec GloVe text classification topic modeling LDA. Knowledge of TensorFlow PyTorch.
           Published college paper on hate speech detection using deep learning transformer models.
           Strong background in linguistics and machine learning. M.Tech Computer Science NLP track.`
  },
  {
    id: 's07', name: 'Karan Mehta',
    text: `DevOps enthusiast with knowledge of AWS EC2 S3 Lambda Docker Kubernetes basics.
           Experience with Jenkins CI/CD pipelines GitHub Actions. Terraform infrastructure as code.
           Linux bash scripting, system administration. Monitoring with Prometheus Grafana.
           Completed AWS Cloud Practitioner certification. Internship at cloud consulting firm.
           B.Tech Computer Networks student interested in cloud and infrastructure automation.`
  },
  {
    id: 's08', name: 'Ananya Bose',
    text: `UI UX designer skilled in Figma Adobe XD wireframing prototyping user research usability testing.
           Designed mobile app interfaces for 5 college projects. Understanding of design systems
           accessibility responsive design. Basic knowledge of HTML CSS for design handoff.
           Participated in design hackathons. Portfolio with case studies in e-commerce and ed-tech.
           B.Des Human-Computer Interaction student passionate about user-centered design.`
  },
  {
    id: 's09', name: 'Vikram Patil',
    text: `Computer vision and image processing with Python OpenCV TensorFlow PyTorch.
           Implemented YOLO object detection for vehicle counting project. Facial recognition attendance
           system using deep learning. Knowledge of ResNet VGG EfficientNet architectures.
           Data augmentation techniques for small datasets. Familiar with NVIDIA CUDA GPU programming.
           Interested in medical imaging AI and autonomous driving applications. Final year M.Tech AI.`
  },
  {
    id: 's10', name: 'Riya Gupta',
    text: `Data engineering student with knowledge of Apache Spark Python SQL ETL pipelines.
           Built college project on real-time Twitter sentiment analysis using Kafka Spark Streaming.
           Familiar with Airflow for workflow orchestration Snowflake data warehousing basics.
           Strong SQL querying skills stored procedures optimization. AWS cloud fundamentals.
           Internship at analytics company working on data pipeline development. B.Tech Data Science.`
  },
  {
    id: 's11', name: 'Siddharth Joshi',
    text: `Blockchain Web3 developer with Solidity Ethereum smart contracts dApps.
           Built NFT marketplace on Ethereum testnet as college project. Familiar with Hardhat Truffle
           Web3.js ethers.js. Understanding of DeFi protocols Uniswap Aave. Python cryptography basics.
           Rust basics for Solana development. Participated in blockchain hackathons winning prizes.
           Interested in DeFi infrastructure and smart contract auditing. B.Tech Computer Science.`
  },
  {
    id: 's12', name: 'Meera Pillai',
    text: `Machine learning research enthusiast with strong mathematics statistics linear algebra calculus.
           Published undergraduate research on generative adversarial networks GANs for image synthesis.
           PyTorch deep learning implementation experience. Reinforcement learning OpenAI Gym projects.
           Reading arXiv papers regularly attending online NeurIPS workshops. Python CUDA basics.
           Aspiring AI research scientist targeting PhD in machine learning. Top rank in class.`
  },
  {
    id: 's13', name: 'Aditya Kumar',
    text: `QA automation engineer with Selenium Python Java test automation framework development.
           API testing Postman REST Assured. Performance testing JMeter. Jira bug tracking Agile Scrum.
           Built page object model POM framework for e-commerce web application testing.
           Knowledge of mobile testing Appium. CI/CD integration with Jenkins.
           Internship at software company QA department. B.Tech Software Engineering.`
  },
  {
    id: 's14', name: 'Lakshmi Subramaniam',
    text: `Business intelligence and data visualization expert with Power BI DAX Tableau SQL.
           Created enterprise-level dashboards for college placement cell tracking KPIs.
           Snowflake BigQuery data warehousing SQL optimization. ETL development SSIS basics.
           Advanced Excel pivot tables VBA macros. Business analytics case competition winner.
           Understanding of dimensional modeling star schema. MBA dual specialization Finance Analytics.`
  },
  {
    id: 's15', name: 'Nikhil Desai',
    text: `Python backend developer with Django Flask REST API development PostgreSQL MongoDB.
           Microservices architecture Docker containerization. AWS deployment EC2 RDS Lambda.
           Celery Redis message queue asynchronous tasks. JWT authentication OAuth integration.
           Unit testing pytest CI/CD GitHub Actions. B.Tech Computer Science with 3 internship
           experiences at product companies building scalable backend systems.`
  }
];

// ─── ROLE DATABASE ─────────────────────────────────────────────────────────────
const ROLE_DATABASE = {
  'Data Analyst': `Data analyst business intelligence SQL Excel Power BI Tableau reporting dashboards
                   KPI tracking data cleaning visualization exploratory analysis business metrics.`,
  'Machine Learning Engineer': `Machine learning Python TensorFlow PyTorch scikit-learn deep learning
                                neural networks model deployment MLOps production AI.`,
  'Data Scientist': `Data scientist Python R statistics machine learning pandas visualization SQL
                     regression classification clustering experimentation hypothesis testing.`,
  'Full Stack Developer': `Full stack JavaScript React Node.js HTML CSS backend frontend database
                           REST API cloud deployment Git responsive web development.`,
  'DevOps Engineer': `DevOps AWS cloud Kubernetes Docker CI/CD Jenkins infrastructure automation
                      Linux scripting monitoring Terraform cloud engineer.`,
  'NLP Engineer': `Natural language processing NLP BERT transformers text classification sentiment
                   SpaCy NLTK Python deep learning HuggingFace language models.`,
  'Computer Vision Engineer': `Computer vision image processing OpenCV deep learning YOLO object
                               detection PyTorch TensorFlow CNN image segmentation.`,
  'Cybersecurity Analyst': `Cybersecurity penetration testing network security ethical hacking Kali
                            Linux Python vulnerability assessment SIEM incident response.`,
  'Mobile Developer': `Android iOS mobile Kotlin Swift Flutter React Native Firebase app development
                       cross-platform mobile UI design.`,
  'UI/UX Designer': `UI UX design Figma wireframing prototyping user research usability design systems
                     accessibility responsive design mobile interface.`,
  'Data Engineer': `Data engineering ETL Spark Kafka Airflow SQL Python data pipeline cloud Snowflake
                    BigQuery data warehouse streaming batch processing.`,
  'Blockchain Developer': `Blockchain Solidity Ethereum smart contracts Web3 DeFi NFT cryptocurrency
                           Hardhat decentralized application development.`,
  'QA Engineer': `Quality assurance automation testing Selenium Python Java Postman API testing
                  performance JMeter Jira Agile test framework.`,
  'Research Scientist': `AI research machine learning deep learning PyTorch reinforcement learning
                        mathematics statistics generative models neural networks publications.`,
  'Business Intelligence Developer': `Business intelligence Power BI Tableau SQL data warehouse ETL
                                     DAX reporting dashboard analytics Snowflake dimensional modeling.`
};

// Role suggestions for chip display
const ROLE_SUGGESTIONS = Object.keys(ROLE_DATABASE);
