<template>
  <div class="container mt-5">
    <b-card>
      <h2>Our Mission</h2>
      <p>
        IndyHackers strives to help tech people in Indiana grow by fostering community connections and celebrating
        individual successes.
      </p>
      <h2>Board Members</h2>
      <div class="board-members">
        <BoardMemberCard 
          email="mailto:zach@indyhackers.org"
          firstName="Zach"
          imageUrl="/images/zachcardwell.jpeg"
          lastName="Cardwell"
          linkedin="https://www.linkedin.com/in/zachcardwell271828" />
        <BoardMemberCard
          email="mailto:amrutha@indyhackers.org"
          firstName="Amrutha"
          imageUrl="/images/amrutha.jpeg"
          lastName="Pulikottil" 
          linkedin="https://www.linkedin.com/in/amruthap" />
        <BoardMemberCard
          email="mailto:andrew@indyhackers.org"
          firstName="Andrew"
          imageUrl="/images/ajr3.jpeg"
          lastName="Robinson III"
          linkedin="https://linkedin.com/in/arthree" />
        <BoardMemberCard
          email="mailto:erik@indyhackers.org"
          firstName="Erik"
          imageUrl="/images/erik.jpeg"
          lastName="Mudrak" 
          linkedin="https://www.linkedin.com/in/ejmudrak" />
        <BoardMemberCard
          email="mailto:katie@indyhackers.org"
          firstName="Katie"
          imageUrl="/images/katiehughes.jpg"
          lastName="Hughes"
          linkedin="https://www.linkedin.com/in/katiehughes" />
        <BoardMemberCard
          email="mailto:cameron@indyhackers.org"
          firstName="Cameron"
          imageUrl="/images/cameron.jpeg"
          lastName="Mueller"
          linkedin="https://www.linkedin.com/in/cameronamueller" />
        <BoardMemberCard
          firstName="Stanton"
          imageUrl="/images/stantonsievers.jpeg"
          lastName="Sievers"
          linkedin="https://www.linkedin.com/in/stantonsievers" />
        <BoardMemberCard
          firstName="Michael"
          imageUrl="/images/michaelwelling.jpg"
          lastName="Welling"
          linkedin="https://www.linkedin.com/in/mewelling" />
        <BoardMemberCard
          firstName="Josh"
          imageUrl="/images/joshhurst.jpg"
          lastName="Hurst"
          linkedin="https://www.linkedin.com/in/josh-hurst42" />
        <BoardMemberCard
          firstName="Ben"
          imageUrl="/images/ben.jpg"
          lastName="Cochran"
          linkedin="https://www.linkedin.com/in/cochranb" />
        <BoardMemberCard
          firstName="Mike"
          imageUrl="/images/mikehockerman.png"
          lastName="Hockerman"
          linkedin="https://www.linkedin.com/in/mhoc" />
        <BoardMemberCard
          firstName="Andrew"
          imageUrl="/images/andrew.jpeg"
          lastName="Poland"
          linkedin="https://www.linkedin.com/in/polandandrew" />
        <BoardMemberCard
          firstName="Chris"
          imageUrl="/images/chris.jpeg"
          lastName="Vannoy"
          linkedin="https://www.linkedin.com/in/cvannoy" />
      </div>
    </b-card>
  </div>
</template>

<style scoped>
h2 {
  font-family: 'Space Mono', monospace;
}
.board-members {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
}
</style>
