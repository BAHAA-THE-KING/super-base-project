import { Donation } from "src/types/data/Donation";

export function useDonationAllData(params: any) {
  const donations: Donation[] = [
    {
      id: 1,
      from: "Central City Mosque",
      amount: 50000,
      details: "Funds collected during the weekly congregation.",
    },
    {
      id: 2,
      from: "Anonymous Donor",
      amount: 10000,
      details: "Online donation via website portal.",
    },
    {
      id: 3,
      from: "Oakwood Community Center",
      amount: 1500,
      details: "Proceeds from a bake sale event.",
    },
    {
      id: 4,
      from: "First Bank of Metropolis",
      amount: 500000,
      details: "Large corporate sponsorship for the annual charity drive.",
    },
    {
      id: 5,
      from: "Jane Doe",
      amount: 250,
      details: "Personal donation in honor of her birthday.",
    },
    {
      id: 6,
      from: "Sunrise Elementary School",
      amount: 750,
      details: "Donation from a student fundraising initiative.",
    },
    {
      id: 7,
      from: "Community Fundraiser Gala",
      amount: 85000,
      details: "Total funds raised from ticket sales and auctions.",
    },
    {
      id: 8,
      from: "Starlight Mosque",
      amount: 25000,
      details: "Regular monthly contribution.",
    },
    {
      id: 9,
      from: "Mike Smith",
      amount: 50,
      details: "Small personal donation.",
    },
    {
      id: 10,
      from: "Local Business Alliance",
      amount: 5000,
      details: "Contribution from local business members.",
    },
    {
      id: 11,
      from: "Green Valley Church",
      amount: 3500,
      details: "Donation from a joint community service project.",
    },
    {
      id: 12,
      from: "Anonymous Donor",
      amount: 15000,
      details: "Large online contribution.",
    },
    {
      id: 13,
      from: "Rivertown Mosque",
      amount: 120000,
      details: "End-of-year donation drive funds.",
    },
    {
      id: 14,
      from: "Charity Walk Participants",
      amount: 45000,
      details: "Donations from participants in the annual charity walk.",
    },
    {
      id: 15,
      from: "Tech Solutions Inc.",
      amount: 100000,
      details: "Corporate gift matching program funds.",
    },
    {
      id: 16,
      from: "Mrs. Davis",
      amount: 75,
      details: "Donation in memory of a loved one.",
    },
    {
      id: 17,
      from: "Springfield Mosque",
      amount: 65000,
      details: "Special collection for a new humanitarian aid project.",
    },
    {
      id: 18,
      from: "Fundraising Raffle Winners",
      amount: 2000,
      details: "Proceeds from a small office raffle.",
    },
    {
      id: 19,
      from: "Grace & Associates",
      amount: 8000,
      details: "Sponsorship for the local food drive.",
    },
    {
      id: 20,
      from: "Online Giving Campaign",
      amount: 3000,
      details: "Donations received through a social media campaign.",
    },
  ];

  const totalRows = donations.length;

  const getDonationsLoading = false;

  return { donations, totalRows, getDonationsLoading };
}
