function fetchAgents() {
  const url = 'https://valorant-api.com/v1/agents';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayAgents(data.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayAgents(agents) {
  const agentsGrid = document.getElementById('agents-grid');

  agents.sort((a, b) => a.displayName.localeCompare(b.displayName));

  let row = null;

  function createAgentBox(agent, index) {
    const agentBox = document.createElement('div');
    agentBox.classList.add('agent-box');

    const agentNameHeading = document.createElement('h2');
    agentNameHeading.textContent = agent.displayName;

    const agentIcon = document.createElement('img');
    agentIcon.src = agent.displayIcon;
    agentIcon.alt = agent.displayName + ' Icon';

    agentBox.appendChild(agentNameHeading);
    agentBox.appendChild(agentIcon);

    row.appendChild(agentBox);

    gsap.from(agentNameHeading, {
      opacity: 0,
      y: -10,
      duration: 0.5,
      delay: 0.1 * index
    });

    agentIcon.addEventListener('click', () => {
      gsap.to(agentIcon, {
        rotation: 360,
        duration: 0.5,
        ease: 'power2.inOut'
      });
      gsap.to(agentIcon, {
        rotation: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.5
      });
    });
  }

  agentsGrid.innerHTML = '';

  agents.forEach((agent, index) => {
    if (index % 4 === 0) {
      row = document.createElement('div');
      row.classList.add('agent-row');
      agentsGrid.appendChild(row);
    }

    createAgentBox(agent, index);
  });
}

gsap.from('h1', { opacity: 0, y: -50, duration: 1 });

fetchAgents();
