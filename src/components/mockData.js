export const mockChatData = [
    {
      id: 1,
      sender: "Client",
      initials: "CL",
      content:
        "Hi Sarah! Absolutely, we've worked on several e-commerce platforms. I'd be happy to share some case studies. What specific features are you looking for?",
      timestamp: "10:32 AM",
      isCurrentUser: true,
    },
    {
      id: 2,
      sender: "Sarah Miller",
      initials: "SM",
      content: "We need a robust product catalog, multi-currency support, and integration with our existing CRM.",
      timestamp: "10:35 AM",
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: "Sarah Miller",
      initials: "SM",
      content: "@alex Can you share details about our recent e-commerce integrations with CRM systems?",
      timestamp: "10:38 AM",
      isCurrentUser: false,
    //   note: "Internal Note",
    },
    {
      id: 4,
      sender: "Client",
      initials: "CL",
      content: "I've attached our portfolio showing similar projects and CRM integrations we've done.",
      timestamp: "10:42 AM",
      isCurrentUser: true,
      files: [
        {
          id: 1,
          name: "E-commerce Portfolio.pdf",
          size: "3.2 MB",
        },
        {
          id: 2,
          name: "CRM Integration Examples.zip",
          size: "5.8 MB",
        },
      ],
    },
    // {
    //   id: 5,
    //   content:
    //     "Based on the conversation, the client needs: 1) Product catalog management, 2) Multi-currency support, 3) CRM integration. Suggested next steps: Share relevant case studies, schedule a discovery call to discuss technical requirements in detail, prepare a preliminary timeline and cost estimate.",
    //   timestamp: "10:43 AM",
    //   isSystemMessage: true,
    // },
  ]
  