<template>
  <div class="container mt-5">
    <b-card>
      <h2>Our Mission</h2>
      <p>
        IndyHackers strives to help tech people in Indiana grow by fostering community connections
        and celebrating individual successes.
      </p>
      <h2>Board Members</h2>
      <div class="board-members">
        <BoardMemberCard
          firstName="Chris"
          imageUrl="/images/board/chris.jpeg"
          lastName="Vannoy"
          linkedin="https://www.linkedin.com/in/cvannoy"
        />
        <BoardMemberCard
          email="mailto:erik@indyhackers.org"
          firstName="Erik"
          imageUrl="/images/board/erik.jpeg"
          lastName="Mudrak"
          linkedin="https://www.linkedin.com/in/ejmudrak"
        />
        <BoardMemberCard
          email="mailto:katie@indyhackers.org"
          firstName="Katie"
          imageUrl="/images/board/katiehughes.jpg"
          lastName="Hughes"
          linkedin="https://www.linkedin.com/in/katiehughes"
        />
        <BoardMemberCard
          email="mailto:cameron@indyhackers.org"
          firstName="Cameron"
          imageUrl="/images/board/cameron.jpeg"
          lastName="Mueller"
          linkedin="https://www.linkedin.com/in/cameronamueller"
        />
        <BoardMemberCard
          email="mailto:ben@indyhackers.org"
          firstName="Ben"
          imageUrl="/images/board/ben.jpg"
          lastName="Cochran"
          linkedin="https://www.linkedin.com/in/cochranb"
        />
        <BoardMemberCard
          firstName="Stanton"
          imageUrl="/images/board/stantonsievers.jpeg"
          lastName="Sievers"
          linkedin="https://www.linkedin.com/in/stantonsievers"
        />
        <BoardMemberCard
          firstName="Michael"
          imageUrl="/images/board/michaelwelling.jpg"
          lastName="Welling"
          linkedin="https://www.linkedin.com/in/mewelling"
        />
        <BoardMemberCard
          firstName="Josh"
          imageUrl="/images/board/joshhurst.jpg"
          lastName="Hurst"
          linkedin="https://www.linkedin.com/in/josh-hurst42"
        />
        <BoardMemberCard
          firstName="Mike"
          imageUrl="/images/board/mikehockerman.png"
          lastName="Hockerman"
          linkedin="https://www.linkedin.com/in/mhoc"
        />
        <BoardMemberCard
          firstName="Andrew"
          imageUrl="/images/board/andrew.jpeg"
          lastName="Poland"
          linkedin="https://www.linkedin.com/in/polandandrew"
        />
        <BoardMemberCard
          email="mailto:zach@indyhackers.org"
          firstName="Zach"
          imageUrl="/images/board/zachcardwell.jpeg"
          lastName="Cardwell"
          linkedin="https://www.linkedin.com/in/zachcardwell271828"
        />
      </div>
    </b-card>
  </div>
</template>

<style scoped>
.board-members {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: space-evenly;
}
</style>
